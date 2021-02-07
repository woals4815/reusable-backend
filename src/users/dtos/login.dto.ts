import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from './core.dto';
import { CreateUserInput } from './create-user.dto';

@InputType()
export class LoginInput extends PickType(CreateUserInput, [
  'email',
  'password',
]) {
  @Field((type) => String)
  email: string;
  @Field((type) => String)
  password: string;
}

@ObjectType()
export class LoginOutput extends CoreOutput {
  @Field((type) => String, { nullable: true })
  token?: string;
}
