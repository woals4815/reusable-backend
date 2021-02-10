import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from './core.dto';

@InputType()
export class MarkWatchedEpisodeInput {
  @Field((type) => Number)
  podcastId: number;
  @Field((type) => Number)
  episodeId: number;
}

@ObjectType()
export class MarkWatchedEpisodeOutput extends CoreOutput{}