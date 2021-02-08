import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/users/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { Episode } from './episode.entity';

@Entity()
@ObjectType()
export class Podcast extends CoreEntity {
  @Field((type) => String)
  @Column()
  title: string;

  @Field((type) => [String])
  @Column('text', { array: true })
  category: string[];

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.podcasts, { onDelete: 'CASCADE' })
  creator: User;

  @RelationId((podcast: Podcast) => podcast.creator)
  creatorId: number;

  @Field((type) => [Episode])
  @OneToMany(() => Episode, (episode) => episode.podcast)
  episodes: Episode[];
}
