import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonEntity } from './lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonInput, GetLessonByIdInput } from './lesson.input';
import { Lesson } from './lesson.graphql';
import { v4 as uuid } from 'uuid';
import { handleError, throwNewGraphqlError } from '@/error/error';
import { OutputErrorEnum, OutputErrorMsg } from '@/error/error.types';
import { NSMAuthGuard } from '@/auth/auth.guard';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private lessonRepository: Repository<LessonEntity>,
  ) {}

  @UseGuards(NSMAuthGuard)
  async getLessons(): Promise<Lesson[]> {
    return await this.lessonRepository.find();
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

  @UseGuards(NSMAuthGuard)
  async createLesson(
    input: CreateLessonInput,
    studentId: string,
  ): Promise<Lesson> {
    try {
      const { name, startDate, endDate } = input;
      const lesson = this.lessonRepository.create({
        id: uuid(),
        name,
        ownerId: studentId,
        startDate,
        endDate,
      });
      return await this.lessonRepository.save(lesson);
    } catch (error) {
      handleError(error);
    }
  }
}
