import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput, GetStudentByIdInput } from './student.input';
import { Student } from './student.graphql';
import { StudentEntity } from './student.entity';
import { v4 as uuid } from 'uuid';
import { handleError, throwNewGraphqlError } from '@/error/error';
import { OutputErrorEnum, OutputErrorMsg } from '@/error/error.types';

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
          message: OutputErrorMsg.NOT_FOUND,
          code: OutputErrorEnum.NOT_FOUND,
        });
      }
      return student;
    } catch (error) {
      handleError(error);
    }
  }

  async createStudent(input: CreateStudentInput): Promise<Student> {
    try {
      const { age, name } = input;
      const student = this.studentRepository.create({
        id: uuid(),
        age,
        name,
        lessons: [],
      });
      return await this.studentRepository.save(student);
    } catch (error) {
      handleError(error);
    }
  }
}
