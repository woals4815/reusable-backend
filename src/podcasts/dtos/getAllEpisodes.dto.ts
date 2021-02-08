import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/users/dtos/core.dto';
import { Episode } from '../entities/episode.entity';

@InputType()
export class GetAllEpisodesInput {
  @Field((type) => Number)
  podcastId: number;
}

@ObjectType()
export class GetAllEpisodesOutput extends CoreOutput {
  @Field((type) => [Episode], { nullable: true })
  episodes?: Episode[];
}
