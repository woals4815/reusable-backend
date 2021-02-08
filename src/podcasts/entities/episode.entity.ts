import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/users/entities/core.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Podcast } from './podcast.entity';

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

  @Field((type) => Number, { nullable: true })
  @Column({ nullable: true })
  rating?: number;
}
