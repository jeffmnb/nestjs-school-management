import { Field, InputType } from '@nestjs/graphql';

@InputType('NSM_SignInInput')
export class SignInInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@InputType('NSM_RefreshTokenInput')
export class RefreshTokenInput {
  @Field(() => String)
  refresh_token: string;
}
