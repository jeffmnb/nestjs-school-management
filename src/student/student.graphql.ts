import { Lesson } from '@/lesson/lesson.graphql';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('NSM_Student')
export class Student {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Number)
  age: number;

  @Field(() => [Lesson])
  lessons: Lesson[];
}
