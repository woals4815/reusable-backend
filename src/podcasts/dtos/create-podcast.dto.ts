import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/users/dtos/core.dto';
import { Category } from '../entities/category.entity';

@InputType()
export class CreatePodcastInput {
  @Field((type) => String)
  title: string;
  @Field((type) => String)
  categoryName: string;
}

@ObjectType()
export class CreatePodcastOutput extends CoreOutput {}
