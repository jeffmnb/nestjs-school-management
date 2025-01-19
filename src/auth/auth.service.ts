import { StudentEntity } from '@/student/student.entity';
import { Injectable } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshTokenInput, SignInInput } from './auth.input';
import { handleError, throwNewGraphqlError } from '@/error/error';
import { OutputErrorEnum, OutputErrorMsg } from '@/error/error.types';
import * as bcrypt from 'bcrypt';
import { TokenOutput } from './auth.graphql';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
    private jwtService: JwtService,
  ) {}

  async signIn(input: SignInInput): Promise<TokenOutput> {
    try {
      const { password, email } = input;
      const student = await this.studentRepository.findOne({
        where: { email },
      });
      if (!student) {
        throwNewGraphqlError({
          message: OutputErrorMsg.USER_NOT_FOUND,
          code: OutputErrorEnum.USER_NOT_FOUND,
        });
      }

      const isPasswordValid = await bcrypt?.compare(
        password,
        student?.password,
      );

      if (!isPasswordValid) {
        throwNewGraphqlError({
          message: OutputErrorMsg.CHECK_LOGIN_CREDENTIALS,
          code: OutputErrorEnum.CHECK_LOGIN_CREDENTIALS,
        });
      }

      const payload = { studentId: student?.id };
      const access_token = this.jwtService.sign(payload);
      const refresh_token = this.jwtService.sign(payload, {
        expiresIn: 3600,
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return { access_token, refresh_token };
    } catch (error) {
      handleError(error);
    }
  }

  async refreshToken(input: RefreshTokenInput): Promise<TokenOutput> {
    try {
      const payload = this.jwtService.verify(input?.refresh_token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const newAccessToken = this.jwtService.sign({
        studentId: payload.studentId,
      });
      const newRefreshToken = this.jwtService.sign(
        { studentId: payload?.studentId },
        {
          expiresIn: 3600,
          secret: process.env.JWT_REFRESH_SECRET,
        },
      );
      return { access_token: newAccessToken, refresh_token: newRefreshToken };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throwNewGraphqlError({
          message: OutputErrorMsg.REFRESH_EXPIRED_TOKEN,
          code: OutputErrorEnum.REFRESH_EXPIRED_TOKEN,
        });
      }
      throwNewGraphqlError({
        message: OutputErrorMsg.INVALID_EXPIRED_TOKEN,
        code: OutputErrorEnum.INVALID_EXPIRED_TOKEN,
      });
    }
  }
}
