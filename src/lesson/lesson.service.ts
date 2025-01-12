import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonEntity } from './lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonInput, GetLessonByIdInput } from './lesson.input';
import { Lesson } from './lesson.graphql';
import { v4 as uuid } from 'uuid';
import { GraphQLError } from 'graphql';

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
    const { id } = input;
    const lesson = await this.lessonRepository.findOne({ where: { id } });
    if (!lesson) {
      throw new GraphQLError('Lesson not found');
    }
    return lesson;
  }

  async createLesson(input: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate } = input;
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
    });
    return await this.lessonRepository.save(lesson);
  }
}
