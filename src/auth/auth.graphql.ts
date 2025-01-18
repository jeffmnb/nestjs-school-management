import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('NSM_SignInOutput')
export class SignInOutput {
  @Field(() => String)
  access_token: string;
}
