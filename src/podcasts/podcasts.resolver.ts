import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/user-role.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  CreateEpisodeInput,
  CreateEpisodeOutput,
} from './dtos/create-episode.dto';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dtos/create-podcast.dto';
import { GetPodcastOutput } from './dtos/get-podcast.dto';
import {
  GetAllEpisodesInput,
  GetAllEpisodesOutput,
} from './dtos/getAllEpisodes.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Resolver((of) => Podcast)
export class PodcastResolver {
  constructor(private readonly podcastService: PodcastsService) {}
  @Query((returns) => [Podcast])
  @Role(['Any'])
  async getAllPodcasts(): Promise<Podcast[]> {
    return this.podcastService.getAllPodcasts();
  }

  @Query((returns) => GetPodcastOutput)
  @Role(['Any'])
  async getPodcast(@Args('podcastId') id: number): Promise<GetPodcastOutput> {
    return this.podcastService.getPodcast(id);
  }

  @Mutation((returns) => CreatePodcastOutput)
  @Role(['Host'])
  async createPodcast(
    @Args('input') createPodcastInput: CreatePodcastInput,
    @AuthUser() host: User,
  ): Promise<CreateEpisodeOutput> {
    return this.podcastService.createPodcast(createPodcastInput, host);
  }
}
@Resolver((of) => Episode)
export class EpisodeResolver {
  constructor(private readonly podcastService: PodcastsService) {}
  @Query((returns) => GetAllEpisodesOutput)
  @Role(['Any'])
  async getAllEpisodes(@Args('input') podcastId: number) {
    return this.podcastService.getAllEpisodes(podcastId);
  }

  @Mutation((returns) => CreateEpisodeOutput)
  @Role(['Host'])
  async createEpisode(
    @Args('input') createEpisodeInput: CreateEpisodeInput,
  ): Promise<CreateEpisodeOutput> {
    return this.podcastService.createEpisode(createEpisodeInput);
  }
}
