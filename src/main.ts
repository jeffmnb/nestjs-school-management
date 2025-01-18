import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GraphQLError } from 'graphql';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const errs = [];
        for (const error of errors) {
          errs.push(...Object.values(error.constraints));
        }
        return new GraphQLError(errs.toString().replace(',', ', '), {
          extensions: { code: 400 },
        });
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
