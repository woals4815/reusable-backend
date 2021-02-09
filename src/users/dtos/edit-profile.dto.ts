import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from './core.dto';

@InputType()
export class EditProfileInput {
  @Field((type) => Number)
  userId: number;
  @Field((type) => String, { nullable: true })
  email?: string;
  @Field((type) => String, { nullable: true })
  password?: string;
}

@ObjectType()
export class EditProfileOutput extends CoreOutput {}
