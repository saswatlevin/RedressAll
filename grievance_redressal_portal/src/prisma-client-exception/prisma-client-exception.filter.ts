import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '../generated/prisma/client';
import { Response } from 'express';

// This filter catches exceptions of type PrismaClientKnownRequestError
// The exception filter extends the BaseExceptionFilter class from the NestJS core package. 
// This class provides a default implementation for the catch method that returns an "Internal server error" response to the user.
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');
    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
        // return;
      }
      default:
        // default 500 error code
        super.catch(exception, host);
        break;
    }
  }
}
