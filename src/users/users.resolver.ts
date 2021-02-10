import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/user-role.decorator';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { GetWatchedEpisodesOutput } from './dtos/get-watched-episodes.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import {
  MarkWatchedEpisodeInput,
  MarkWatchedEpisodeOutput,
} from './dtos/mark-watched.dto';
import {
  GetSubscriptionInput,
  GetSubscriptionOutput,
} from './dtos/subscriptions.dto';
import { ToggleSubscribeOutput } from './dtos/toggle-subscribe.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}
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
  @Role(['Any'])
  @Query((returns) => User)
  me(@AuthUser() user: User) {
    return user;
  }
  @Role(['Any'])
  @Query((returns) => GetSubscriptionOutput)
  async getSubscriptions(
    @AuthUser() user: User,
  ): Promise<GetSubscriptionOutput> {
    return this.usersService.getSubscriptions(user);
  }
  @Role(['Any'])
  @Query((returns) => GetWatchedEpisodesOutput)
  async getWatchedEpisodes(
    @AuthUser() user: User,
  ): Promise<GetWatchedEpisodesOutput> {
    return this.usersService.getWatchedEpisodes(user);
  }

  @Role(['Any'])
  @Mutation((returns) => EditProfileOutput)
  async editProfile(
    @Args('input') input: EditProfileInput,
    @AuthUser() user: User,
  ): Promise<EditProfileOutput> {
    return this.usersService.editProfile(input, user);
  }
  @Role(['Any'])
  @Mutation((returns) => ToggleSubscribeOutput)
  async toggleSubscribe(
    @Args('podcastId') podcastId: number,
    @AuthUser() user: User,
  ): Promise<ToggleSubscribeOutput> {
    return this.usersService.toggleSubscribe(podcastId, user);
  }

  @Role(['Any'])
  @Mutation((returns) => MarkWatchedEpisodeOutput)
  async markWatchedEpisode(
    @Args('input') input: MarkWatchedEpisodeInput,
    @AuthUser() user: User,
  ): Promise<MarkWatchedEpisodeOutput> {
    return this.usersService.markWatchedEpisode(input, user);
  }
}
