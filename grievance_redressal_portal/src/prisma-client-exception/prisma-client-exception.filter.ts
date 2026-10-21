import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '../generated/prisma/client';
import { Response } from 'express';

// This filter catches exceptions of type PrismaClientKnownRequestError
// The exception filter extends the BaseExceptionFilter class from the NestJS core package. 
// This class provides a default implementation for the catch method that returns an "Internal server error" response to the user.
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  // Logger forwards messages to the current Winston Logger
  // through the existing app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER)) configuration connects NestJS's logger to Winston
  private readonly logger = new Logger(PrismaClientExceptionFilter.name);
  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    // Log the original exception for server-side debugging.
    console.error(exception.code, exception.message);

     // Log the Prisma exception through your configured Winston logger.
    this.logger.error(
      `Prisma error ${exception.code}: ${exception.message}`,
      exception.stack,
    );

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Map Prisma error codes to HTTP status codes and safe messages.
    let status: HttpStatus;
    let message: string;

    switch (exception.code) {
      case 'P2000':
        status = HttpStatus.BAD_REQUEST;
        message = 'A supplied value is too long for the field.';
        break;

      case 'P2001':
        status = HttpStatus.NOT_FOUND;
        message = 'The requested record was not found.';
        break;

      case 'P2002':
        status = HttpStatus.CONFLICT;
        message = 'A record with this value already exists.';
        break;

      case 'P2003':
        status = HttpStatus.CONFLICT;
        message = 'This operation violates a relationship constraint.';
        break;

      case 'P2004':
        status = HttpStatus.BAD_REQUEST;
        message = 'The supplied data violates a database constraint.';
        break;

      case 'P2011':
        status = HttpStatus.BAD_REQUEST;
        message = 'A required field cannot be null.';
        break;

      case 'P2015':
      case 'P2018':
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = 'A record required for this operation was not found.';
        break;

      default:
        // Delegate unrecognized Prisma errors to NestJS's default handler.
        super.catch(exception, host);
        return;
    }

    // Return the mapped HTTP response.
    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
