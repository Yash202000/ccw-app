import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './core/auth/auth.module';
import { PostModule } from './post/post.module';
import { ProfileModule } from './profile/profile.module';
import { FeedbackModule } from './feedback/feedback.module';
import { CommentModule } from './comment/comment.module';
import { UpvoteModule } from './upvote/upvote.module';
import { LogController } from './log/log.controller';
import { LogService } from './log/log.service';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PostModule,
    ProfileModule,
    FeedbackModule,
    CommentModule,
    UpvoteModule,
  ],
  controllers: [AppController, LogController],
  providers: [AppService, LogService],
})
export class AppModule {}
