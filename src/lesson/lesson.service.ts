import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonEntity } from './lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonInput, GetLessonByIdInput } from './lesson.input';
import { Lesson } from './lesson.graphql';
import { v4 as uuid } from 'uuid';
import { handleError, throwNewGraphqlError } from '@/error/error';
import { OutputErrorEnum, OutputErrorMsg } from '@/error/error.types';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private lessonRepository: Repository<LessonEntity>,
  ) {}

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

  async createLesson(input: CreateLessonInput): Promise<Lesson> {
    try {
      const { name, startDate, endDate } = input;
      const lesson = this.lessonRepository.create({
        id: uuid(),
        name,
        startDate,
        endDate,
      });
      return await this.lessonRepository.save(lesson);
    } catch (error) {
      handleError(error);
    }
  }
}
