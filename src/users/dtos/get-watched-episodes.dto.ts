import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Episode } from 'src/podcasts/entities/episode.entity';
import { CoreOutput } from './core.dto';

@ObjectType()
export class GetWatchedEpisodesOutput extends CoreOutput {
  @Field((type) => [Episode], { nullable: true })
  watchedEpisodes?: Episode[];
}
