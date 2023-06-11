import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable Passport middleware
  app.use(passport.initialize());
  await app.listen(5500);
}
bootstrap();
