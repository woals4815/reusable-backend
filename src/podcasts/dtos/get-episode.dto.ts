import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/users/dtos/core.dto';
import { Episode } from '../entities/episode.entity';

@InputType()
export class GetEpisodeInput {
  @Field((type) => Int)
  podcastId: number;
  @Field((type) => Int)
  episodeId: number;
}

@ObjectType()
export class GetEpisodeOutput extends CoreOutput {
  @Field((type) => Episode, { nullable: true })
  episode?: Episode;
}
