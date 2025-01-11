import { Query, Resolver } from '@nestjs/graphql';
import { Lesson } from './lesson.graphql';

@Resolver('Lesson')
export class LessonResolver {
  @Query(() => Lesson)
  getLesson(): Lesson {
    return {
      id: '12345',
      name: 'Lesson 1',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }
}
