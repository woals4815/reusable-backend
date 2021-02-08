import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/users/dtos/core.dto';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class GetPodcastInput {
  @Field((type) => Number)
  podcastId: number;
}

@ObjectType()
export class GetPodcastOutput extends CoreOutput {
  @Field((type) => Podcast, { nullable: true })
  podcast?: Podcast;
}
