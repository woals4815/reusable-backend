import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '../dtos/core.dto';

@InputType()
export class CreateUserInput {
  @Field((typs) => String)
  email: string;
  @Field((typs) => String)
  password: string;
  @Field((type) => String)
  name: string;
}

@ObjectType()
export class CreateUserOutput extends CoreOutput {}
