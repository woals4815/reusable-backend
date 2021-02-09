import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { CoreEntity } from './core.entity';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { Podcast } from 'src/podcasts/entities/podcast.entity';
import { Rating } from 'src/podcasts/entities/rating.entity';

export enum UserRole {
  Client = 'Client',
  Host = 'Host',
}
registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  name: string;

  @Field((type) => String)
  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Field((type) => String)
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field((typs) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @OneToMany(() => Podcast, (podcast) => podcast.creator)
  @Field((typs) => [Podcast])
  podcasts: Podcast[];

  @Field((type) => [Rating], { nullable: true })
  @OneToMany(() => Rating, (rating) => rating.ratedPerson, { nullable: true })
  rated?: Rating[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    try {
      const saltOrRounds = 10;
      this.password = await bcrypt.hash(this.password, saltOrRounds);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
