import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/users/dtos/core.dto';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class SearchPodcastInput {
  @Field((type) => String)
  query: string;
  @Field((type) => Number)
  page: number;
}
@ObjectType()
export class SearchPodcastOutput extends CoreOutput {
  @Field((type) => [Podcast], { nullable: true })
  searchResults?: Podcast[];
  @Field((type) => Number, { nullable: true })
  pageNumber?: number;
  @Field((type) => Number, { nullable: true })
  totalResultNumber?: number;
}
