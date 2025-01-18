import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput, GetStudentByIdInput } from './student.input';
import { Student } from './student.graphql';
import { StudentEntity } from './student.entity';
import { v4 as uuid } from 'uuid';
import { handleError, throwNewGraphqlError } from '@/error/error';
import { OutputErrorEnum, OutputErrorMsg } from '@/error/error.types';
import * as bcrypt from 'bcrypt';
import { LessonEntity } from '@/lesson/lesson.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  async getStudents(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async getStudentById(input: GetStudentByIdInput): Promise<Student> {
    try {
      const student = await this.studentRepository.findOne({
        where: { id: input?.id },
      });
      if (!student) {
        throwNewGraphqlError({
          message: OutputErrorMsg.USER_NOT_FOUND,
          code: OutputErrorEnum.USER_NOT_FOUND,
        });
      }
      return student;
    } catch (error) {
      handleError(error);
    }
  }

  async validateStudentExists(email: string): Promise<void> {
    try {
      const student = await this.studentRepository.findOne({
        where: { email },
      });
      if (student) {
        throwNewGraphqlError({
          message: OutputErrorMsg.EMAIL_ALREADY_EXISTS,
          code: OutputErrorEnum.EMAIL_ALREADY_EXISTS,
        });
      }
    } catch (error) {
      handleError(error);
    }
  }

  async createStudent(input: CreateStudentInput): Promise<Student> {
    try {
      const { age, name, password, email } = input;
      await this.validateStudentExists(email);
      const salt = await bcrypt.genSalt();
      const passwordHashed = await bcrypt.hash(password, salt);

      const student = this.studentRepository.create({
        id: uuid(),
        age,
        name,
        password: passwordHashed,
        email,
        lessons: [],
      });
      return await this.studentRepository.save(student);
    } catch (error) {
      handleError(error);
    }
  }

  async syncStudentToNewLesson(studentId: string, newLesson: LessonEntity) {
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
    });
    student.lessons.push(newLesson);
    return this.studentRepository.save(student);
  }
}
