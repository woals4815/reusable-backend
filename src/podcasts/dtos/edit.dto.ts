import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CoreOutput } from 'src/users/dtos/core.dto';
import { CreatePodcastInput } from './create-podcast.dto';

@InputType()
export class EditPodcastInput extends PartialType(CreatePodcastInput) {
  @Field((type) => Number)
  podcastId: number;
}

@ObjectType()
export class EditPodcastOutput extends CoreOutput {}

@InputType()
export class EditEpisodeInput {
  @Field((type) => Number)
  podcastId: number;
  @Field((type) => Number)
  episodeId: number;
  @Field((type) => String, { nullable: true })
  title?: string;
  @Field((type) => String, { nullable: true })
  description?: string;
}

@ObjectType()
export class EditEpisodeOutput extends CoreOutput {}
