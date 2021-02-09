import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Podcast } from 'src/podcasts/entities/podcast.entity';
import { PodcastsModule } from 'src/podcasts/podcasts.module';
import { PodcastsService } from 'src/podcasts/podcasts.service';
import { User } from './entities/user.entity';
import { UserResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PodcastsModule],
  providers: [UserResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
