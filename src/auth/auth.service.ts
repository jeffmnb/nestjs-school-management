import { StudentEntity } from '@/student/student.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInInput } from './auth.input';
import { handleError, throwNewGraphqlError } from '@/error/error';
import { OutputErrorEnum, OutputErrorMsg } from '@/error/error.types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
    private jwtService: JwtService,
  ) {}

  async signIn(input: SignInInput): Promise<{ access_token: string }> {
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
      return { access_token };
    } catch (error) {
      handleError(error);
    }
  }
}
