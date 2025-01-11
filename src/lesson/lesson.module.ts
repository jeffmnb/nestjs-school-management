import { Module } from '@nestjs/common';
import { LessonResolver } from './lesson.resolver';

@Module({
  imports: [LessonResolver],
})
export class LessonModule {}
