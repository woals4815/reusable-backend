import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '../dtos/core.dto';
import { UserRole } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @Field((typs) => String)
  email: string;
  @Field((typs) => String)
  password: string;
  @Field((type) => String)
  name: string;
  @Field((type) => UserRole)
  role: UserRole;
}

@ObjectType()
export class CreateUserOutput extends CoreOutput {}
