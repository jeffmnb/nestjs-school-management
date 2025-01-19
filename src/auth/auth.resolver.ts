import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RefreshTokenInput, SignInInput } from './auth.input';
import { TokenOutput } from './auth.graphql';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => TokenOutput)
  async signIn(@Args('input') input: SignInInput): Promise<TokenOutput> {
    return this.authService.signIn(input);
  }

  @Mutation(() => TokenOutput)
  async refreshToken(
    @Args('input') input: RefreshTokenInput,
  ): Promise<TokenOutput> {
    return this.authService.refreshToken(input);
  }
}
