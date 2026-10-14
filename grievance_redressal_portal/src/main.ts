import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// Implements BigInt serialization
// That is, allows the conversion of BigInt to JSON in the response.
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  
  // Calling the ValidationPipe middleware 
  // Allows only white-listed characters
  // Forbids all non-whitelisted characters.
  // Transforms dangerous characters.
  app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
);
  //app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
