import { Field, InputType } from '@nestjs/graphql';

@InputType('NSM_SignInInput')
export class SignInInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
