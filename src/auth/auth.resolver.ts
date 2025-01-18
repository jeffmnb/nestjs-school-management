import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput } from './auth.input';
import { SignInOutput } from './auth.graphql';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => SignInOutput)
  async signIn(
    @Args('input') input: SignInInput,
  ): Promise<{ access_token: string }> {
    return this.authService.signIn(input);
  }
}
