import { Field, InputType, ObjectType } from '@nestjs/graphql';

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
export class CreateUserOutput {
  @Field((type) => Boolean)
  ok: boolean;
  @Field((typs) => String, { nullable: true })
  error?: string;
}
