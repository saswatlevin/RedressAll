import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as winston from 'winston';

// Implements BigInt serialization
// That is, allows the conversion of BigInt to JSON in the response.
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  console.log("In bootstrap()");
  console.log("NEST APP START LOG");
  //const app = await NestFactory.create(AppModule);
  // bufferlogs is for winston
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  console.log("Created the Nest App through NestFactory");

  // Retrieve the Winston logger registered with NestJS.
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  

  // Use Winston as NestJS's application logger.
  app.useLogger(logger);
  console.log("Loaded the Winston Logger");

  // Calling the ValidationPipe middleware 
  // Allows only white-listed characters
  // Forbids all non-whitelisted characters.
  // Transforms dangerous characters.
  app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,

    // Exception filter to catch and log ValidationErrors caused by the DTO.
     exceptionFactory: (errors) => {
      // Record DTO validation failures through Winston.
      logger.error(
        `DTO validation failed: ${JSON.stringify(errors)}`,
        'ValidationPipe',
      );

      // Return a 400 Bad Request response.
      const messages = errors.flatMap((error) =>
        Object.values(error.constraints ?? {}),
      );

      return new BadRequestException(messages);
    },

  }),

);

console.log("Loaded the useGlobalPipes setting");
// Added the PrismaExceptionFilter 
const { httpAdapter } = app.get(HttpAdapterHost);
app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  
console.log("Loaded the PrismaExceptionFilter setting");
  
await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
