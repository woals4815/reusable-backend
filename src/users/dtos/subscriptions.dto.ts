import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Podcast } from 'src/podcasts/entities/podcast.entity';
import { CoreOutput } from './core.dto';

@InputType()
export class GetSubscriptionInput {
  @Field((type) => Number)
  userId: number;
}
@ObjectType()
export class GetSubscriptionOutput extends CoreOutput {
  @Field((type) => [Podcast], { nullable: true })
  subscriptions?: Podcast[];
}
