import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Lesson } from './lesson.graphql';
import { LessonService } from './lesson.service';
import { CreateLessonInput, GetLessonByIdInput } from './lesson.input';
import { UseGuards } from '@nestjs/common';
import { NSMAuthGuard } from '@/auth/auth.guard';
import { GetAuth } from '@/decorators/get-auth.decorator';

@Resolver('Lesson')
export class LessonResolver {
  constructor(private lessonService: LessonService) {}

  @UseGuards(NSMAuthGuard)
  @Query(() => [Lesson])
  getLessons(): Promise<Lesson[]> {
    return this.lessonService.getLessons();
  }

  @UseGuards(NSMAuthGuard)
  @Query(() => Lesson)
  getLessonById(@Args('input') input: GetLessonByIdInput): Promise<Lesson> {
    return this.lessonService.getLessonById(input);
  }

  @UseGuards(NSMAuthGuard)
  @Mutation(() => Lesson)
  createLesson(
    @Args('input') input: CreateLessonInput,
    @GetAuth() studentId: string,
  ): Promise<Lesson> {
    return this.lessonService.createLesson(input, studentId);
  }
}
