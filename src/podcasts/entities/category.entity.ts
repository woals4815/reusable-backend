import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/users/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Podcast } from './podcast.entity';

@InputType('CategoryInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Category extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  slug: string;

  @Field((type) => [Podcast])
  @OneToMany(() => Podcast, (podcast) => podcast.category)
  podcasts: Podcast[];
}
