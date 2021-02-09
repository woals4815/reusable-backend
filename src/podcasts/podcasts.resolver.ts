import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/user-role.decorator';
import { CoreOutput } from 'src/users/dtos/core.dto';
import { User } from 'src/users/entities/user.entity';
import {
  CreateEpisodeRatingInput,
  CreateEpisodeRatingOutput,
  CreatePodcastRatingInput,
  CreatePodcastRatingOutput,
} from './dtos/create-rating.dto';
import {
  CreateEpisodeInput,
  CreateEpisodeOutput,
} from './dtos/create-episode.dto';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dtos/create-podcast.dto';
import { GetEpisodeInput, GetEpisodeOutput } from './dtos/get-episode.dto';
import { GetPodcastOutput } from './dtos/get-podcast.dto';
import { GetAllEpisodesOutput } from './dtos/getAllEpisodes.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';
import {
  EditEpisodeInput,
  EditEpisodeOutput,
  EditPodcastInput,
  EditPodcastOutput,
} from './dtos/edit.dto';
import {
  EditEpisodeRatingInput,
  EditEpisodeRatingOutput,
  EditPodcastRatingInput,
  EditPodcastRatingOutput,
} from './dtos/edit-rating.dto';
import { Rating } from './entities/rating.entity';

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

  @Mutation((returns) => EditPodcastOutput)
  @Role(['Host'])
  async editPodcast(
    @Args('input') input: EditPodcastInput,
    @AuthUser() host: User,
  ): Promise<EditPodcastOutput> {
    return this.podcastService.editPodcast(input, host);
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

  @Query((returns) => GetEpisodeOutput)
  @Role(['Any'])
  async getEpisode(
    @Args('input') getEpisodeInput: GetEpisodeInput,
  ): Promise<GetEpisodeOutput> {
    return this.podcastService.getEpisode(getEpisodeInput);
  }

  @Mutation((returns) => CreateEpisodeOutput)
  @Role(['Host'])
  async createEpisode(
    @Args('input') createEpisodeInput: CreateEpisodeInput,
  ): Promise<CreateEpisodeOutput> {
    return this.podcastService.createEpisode(createEpisodeInput);
  }

  @Mutation((returns) => EditEpisodeOutput)
  @Role(['Host'])
  async editEpisode(
    @Args('input') input: EditEpisodeInput,
    @AuthUser() creator: User,
  ): Promise<EditEpisodeOutput> {
    return this.podcastService.editEpisode(input, creator);
  }
}

@Resolver((of) => Rating)
export class RatingResolver {
  constructor(private readonly podcastService: PodcastsService) {}
  @Mutation((returns) => CreatePodcastRatingOutput)
  @Role(['Client'])
  async ratePodcast(
    @Args('input') input: CreatePodcastRatingInput,
    @AuthUser() client: User,
  ): Promise<CreatePodcastRatingOutput> {
    return this.podcastService.ratePodcast(input, client);
  }
  @Mutation((returns) => CoreOutput)
  @Role(['Client'])
  async rateEpisode(
    @Args('input') input: CreateEpisodeRatingInput,
    @AuthUser() client: User,
  ): Promise<CreateEpisodeRatingOutput> {
    return this.podcastService.createEpisodeRating(input, client);
  }
  @Mutation((returns) => EditPodcastRatingOutput)
  @Role(['Client'])
  async editPodcastRating(
    @Args('input') input: EditPodcastRatingInput,
    @AuthUser() client: User,
  ): Promise<EditPodcastRatingOutput> {
    return this.podcastService.editPodcastRating(input, client);
  }
  @Mutation((returns) => EditEpisodeRatingOutput)
  @Role(['Client'])
  async editEpisodeRating(
    @Args('input') input: EditEpisodeRatingInput,
    @AuthUser() client: User,
  ) {
    return this.podcastService.editEpisodeRating(input, client);
  }
}
