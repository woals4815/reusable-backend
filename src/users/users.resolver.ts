import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query((returns) => [User])
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }
  @Mutation((returns) => CreateUserOutput)
  async createUser(
    @Args('input') createUserinput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.usersService.createUser(createUserinput);
  }
  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.usersService.login(loginInput);
  }
}
