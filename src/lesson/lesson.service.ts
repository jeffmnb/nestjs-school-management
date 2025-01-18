import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonEntity } from './lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonInput, GetLessonByIdInput } from './lesson.input';
import { Lesson } from './lesson.graphql';
import { v4 as uuid } from 'uuid';
import { handleError, throwNewGraphqlError } from '@/error/error';
import { OutputErrorEnum, OutputErrorMsg } from '@/error/error.types';
import { StudentService } from '@/student/student.service';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private lessonRepository: Repository<LessonEntity>,
    private studentService: StudentService,
  ) {}

  async getLessons(studentId: string): Promise<Lesson[]> {
    return await this.lessonRepository.find({ where: { studentId } });
  }

  async getLessonById(input: GetLessonByIdInput): Promise<Lesson> {
    try {
      const { id } = input;
      const lesson = await this.lessonRepository.findOne({ where: { id } });
      if (!lesson) {
        throwNewGraphqlError({
          message: OutputErrorMsg.NOT_FOUND,
          code: OutputErrorEnum.NOT_FOUND,
        });
      }
      return lesson;
    } catch (error) {
      handleError(error);
    }
  }

  async createLesson(
    input: CreateLessonInput,
    studentId: string,
  ): Promise<Lesson> {
    try {
      const { name, startDate, endDate } = input;
      const lesson = this.lessonRepository.create({
        id: uuid(),
        name,
        studentId,
        startDate,
        endDate,
      });

      await this.studentService.syncStudentToNewLesson(studentId, lesson);
      return await this.lessonRepository.save(lesson);
    } catch (error) {
      handleError(error);
    }
  }
}
