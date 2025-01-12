import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Lesson } from './lesson.graphql';
import { LessonService } from './lesson.service';
import { CreateLessonInput, GetLessonByIdInput } from './lesson.input';

@Resolver('Lesson')
export class LessonResolver {
  constructor(private lessonService: LessonService) {}

  @Query(() => [Lesson])
  getLessons(): Promise<Lesson[]> {
    return this.lessonService.getLessons();
  }

  @Query(() => Lesson)
  getLessonById(@Args('input') input: GetLessonByIdInput): Promise<Lesson> {
    return this.lessonService.getLessonById(input);
  }

  @Mutation(() => Lesson)
  createLesson(@Args('input') input: CreateLessonInput): Promise<Lesson> {
    return this.lessonService.createLesson(input);
  }
}
