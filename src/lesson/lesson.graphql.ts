import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('NSM_Lesson')
export class Lesson {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  studentId: string;

  @Field(() => String)
  startDate: string;

  @Field(() => String)
  endDate: string;
}
