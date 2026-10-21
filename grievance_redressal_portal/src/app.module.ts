import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ChainsModule } from './chains/chains.module';
import { OutletsModule } from './outlets/outlets.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { AuthenticationModule } from '@nestjs/authentication';
import { MyAuthenticationModule } from './authentication/myauthentication.module';

import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

@Module({
  imports: [
    UsersModule, 
    PrismaModule, 
    ChainsModule, 
    OutletsModule, 
    PostsModule, 
    CommentsModule,

     AuthenticationModule.forRoot({
      // Keep your existing authentication/session configuration here.
      
      // Enable secure cookies only in production.
      session: {
        cookie: {
          secure: process.env.NODE_ENV === 'production',
        },
      },
    }),
    MyAuthenticationModule,

    WinstonModule.forRoot({
      level: process.env.LOG_LEVEL ?? 'info',

      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),

      transports: [
        new DailyRotateFile({
          dirname: 'logs',
          filename: 'application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),

        new DailyRotateFile({
          dirname: 'logs',
          filename: 'errors-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '30d',
          level: 'error',
        }),
      ],
  }), 

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
