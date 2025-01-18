import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { StudentRepository } from '../student/student.repository';
import { StudentEntity } from '../student/student.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: StudentRepository,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: { studentId: string }): Promise<StudentEntity> {
    const { studentId } = payload;
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
    });
    if (!student) throw new UnauthorizedException();
    return student;
  }
}
