import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('NSM_TokenOutput')
export class TokenOutput {
  @Field(() => String)
  access_token: string;

  @Field(() => String)
  refresh_token: string;
}
