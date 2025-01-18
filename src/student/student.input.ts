import { Field, InputType, Int } from '@nestjs/graphql';

@InputType('NSM_GetStudentByIdInput')
export class GetStudentByIdInput {
  @Field(() => String)
  id: string;
}

@InputType('NSM_CreateStudentInput')
export class CreateStudentInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  age: number;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
