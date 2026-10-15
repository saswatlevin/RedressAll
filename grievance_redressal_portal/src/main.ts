import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

// Implements BigInt serialization
// That is, allows the conversion of BigInt to JSON in the response.
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  // bufferlogs is for winston
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  
  // Loading winston
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  
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

  // Added the PrismaExceptionFilter 
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  
  
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
