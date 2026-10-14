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
    }),
    MyAuthenticationModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
