import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/users/dtos/core.dto';

@InputType()
export class DeletePodcastInput {
  @Field((type) => Number)
  podcastId: number;
}

@InputType()
export class DeleteEpisodeInput extends DeletePodcastInput {
  @Field((type) => Number)
  episodeId: number;
}

@ObjectType()
export class DeleteOutput extends CoreOutput {}
