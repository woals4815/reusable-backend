import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { Rating } from './entities/rating.entity';
import {
  EpisodeResolver,
  PodcastResolver,
  RatingResolver,
} from './podcasts.resolver';
import { PodcastsService } from './podcasts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Podcast, Episode, Rating])],
  providers: [
    PodcastsService,
    PodcastResolver,
    EpisodeResolver,
    RatingResolver,
  ],
})
export class PodcastsModule {}
