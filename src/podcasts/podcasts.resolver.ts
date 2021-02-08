import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/user-role.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dtos/create-podcast.dto';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Resolver((of) => Podcast)
export class PodcastResolver {
  constructor(private readonly podcastService: PodcastsService) {}
  @Mutation((returns) => CreatePodcastOutput)
  @Role(['Host'])
  async createPodcast(
    @Args('input') createPodcastInput: CreatePodcastInput,
    @AuthUser() host: User,
  ) {
    return this.podcastService.createPodcast(createPodcastInput, host);
  }
}
