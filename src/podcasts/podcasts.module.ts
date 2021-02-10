import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { Rating } from './entities/rating.entity';
import {
  CategoryResolver,
  EpisodeResolver,
  PodcastResolver,
  RatingResolver,
} from './podcasts.resolver';
import { PodcastsService } from './podcasts.service';
import { CategoryRepository } from './repositories/category.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Podcast, Episode, Rating, CategoryRepository]),
  ],
  providers: [
    PodcastsService,
    PodcastResolver,
    EpisodeResolver,
    RatingResolver,
    CategoryResolver,
  ],
  exports: [PodcastsService],
})
export class PodcastsModule {}
