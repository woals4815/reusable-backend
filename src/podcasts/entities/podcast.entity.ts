import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/users/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Category } from './category.entity';
import { Episode } from './episode.entity';
import { Rating } from './rating.entity';

@Entity()
@ObjectType()
export class Podcast extends CoreEntity {
  @Field((type) => String)
  @Column()
  title: string;

  @Field((type) => Category)
  @ManyToOne(() => Category, (category) => category.podcasts, {
    onDelete: 'SET NULL',
  })
  category: Category;

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.podcasts, {
    onDelete: 'CASCADE',
  })
  creator: User;

  @RelationId((podcast: Podcast) => podcast.creator)
  creatorId: number;

  @Field((type) => [Episode])
  @OneToMany(() => Episode, (episode) => episode.podcast, { eager: true })
  episodes: Episode[];

  @OneToMany(() => Rating, (rating) => rating.podcast, {
    nullable: true,
    eager: true,
  })
  @Field((type) => [Rating], { nullable: true })
  ratings?: Rating[];

  @ManyToMany(() => User, (user) => user.subscribedPodcast)
  subscribers: User[];
}
