import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { CoreOutput } from 'src/users/dtos/core.dto';

@InputType()
export class CreateEpisodeRatingInput {
  @Field((type) => Number)
  @Min(0)
  @Max(5)
  rating: number;
  @Field((type) => Int)
  podcastId: number;
  @Field((type) => Int)
  episodeId: number;
}

@InputType()
export class CreatePodcastRatingInput {
  @Field((type) => Number)
  @Min(0)
  @Max(5)
  rating: number;
  @Field((type) => Int)
  podcastId: number;
}

@ObjectType()
export class CreateEpisodeRatingOutput extends CoreOutput {}

@ObjectType()
export class CreatePodcastRatingOutput extends CoreOutput {}
