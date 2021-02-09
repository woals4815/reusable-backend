import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/users/entities/core.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { Podcast } from './podcast.entity';
import { Rating } from './rating.entity';

@ObjectType()
@Entity()
export class Episode extends CoreEntity {
  @Field((type) => String)
  @Column()
  title: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field((type) => Podcast)
  @ManyToOne(() => Podcast, (podcast) => podcast.episodes, {
    onDelete: 'CASCADE',
  })
  podcast: Podcast;

  @RelationId((episode: Episode) => episode.podcast)
  podcastId: number;

  @Field((type) => [Rating], { nullable: true })
  @OneToMany(() => Rating, (rating) => rating.episode, { nullable: true })
  ratings?: Rating[];
}
