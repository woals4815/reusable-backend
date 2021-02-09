import { Field, ObjectType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { CoreEntity } from 'src/users/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, RelationId } from 'typeorm';
import { Episode } from './episode.entity';
import { Podcast } from './podcast.entity';

@ObjectType()
@Entity()
export class Rating extends CoreEntity {
  @Field((type) => Number)
  @Column()
  @Min(0)
  @Max(5)
  rating: number;

  @Field((type) => Podcast)
  @ManyToOne(() => Podcast, (podcast) => podcast.ratings)
  podcast: Podcast;

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.rated)
  ratedPerson: User;

  @Field((type) => Episode)
  @ManyToOne(() => Episode, (episode) => episode.ratings)
  episode: Episode;
}
