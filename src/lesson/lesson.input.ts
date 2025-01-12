import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('NSM_LessonInput')
export class CreateLessonInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  startDate: string;

  @Field(() => String)
  endDate: string;
}

@InputType('NSM_GetLessonByIdInput')
export class GetLessonByIdInput {
  @Field(() => ID)
  id: string;
}
