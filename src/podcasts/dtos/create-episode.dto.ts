import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/users/dtos/core.dto';

@InputType()
export class CreateEpisodeInput {
  @Field((type) => Number)
  podcastId: number;
  @Field((type) => String)
  title: string;
  @Field((type) => String)
  description: string;
}

@ObjectType()
export class CreateEpisodeOutput extends CoreOutput {
  @Field((type) => Number, { nullable: true })
  episodeId?: number;
}
