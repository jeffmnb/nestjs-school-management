import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

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

  @IsEmail()
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
