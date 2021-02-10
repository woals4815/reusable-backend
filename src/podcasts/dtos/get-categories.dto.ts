import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/users/dtos/core.dto';
import { Category } from '../entities/category.entity';

@ObjectType()
export class GetCategoriesOutput extends CoreOutput {
  @Field((type) => [Category], { nullable: true })
  categories?: Category[];
}
