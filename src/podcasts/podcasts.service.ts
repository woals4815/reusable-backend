import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
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
import { EditPodcastInput, EditPodcastOutput } from './dtos/edit-podcast.dto';

@Injectable()
export class PodcastsService {
  constructor(
    @InjectRepository(Podcast)
    private podcastRepository: Repository<Podcast>,
    @InjectRepository(Episode)
    private episodeRepository: Repository<Episode>,
  ) {}
  async getAllPodcasts(): Promise<Podcast[]> {
    try {
      const podcasts = await this.podcastRepository.find();
      return podcasts;
    } catch (error) {
      console.log(error);
    }
  }
  async createPodcast(
    { title, category }: CreatePodcastInput,
    host: User,
  ): Promise<CreatePodcastOutput> {
    try {
      const newPodcast = await this.podcastRepository.create({
        title,
        category,
      });
      newPodcast.creator = host;
      await this.podcastRepository.save(newPodcast);
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Cannot create the podcast.',
      };
    }
  }
  async findPodcastById(
    id: number,
  ): Promise<{ podcast?: Podcast; ok: boolean; error?: string }> {
    try {
      const podcast = await this.podcastRepository.findOneOrFail({ id });
      if (!podcast) {
        return {
          ok: false,
          error: 'There is not the podcast.',
        };
      }
      return {
        ok: true,
        podcast,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Cannot find a podcast of the id.',
      };
    }
  }
  async createEpisode({
    title,
    description,
    podcastId,
  }: CreateEpisodeInput): Promise<CreateEpisodeOutput> {
    try {
      const newEpisode = await this.episodeRepository.create({
        title,
        description,
      });
      const { podcast } = await this.findPodcastById(podcastId);
      newEpisode.podcast = podcast;
      await this.episodeRepository.save(newEpisode);
      return {
        ok: true,
        episodeId: newEpisode.id,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Cannot create the episode.',
      };
    }
  }
  async getPodcast(id: number): Promise<GetPodcastOutput> {
    try {
      const podcast = await this.podcastRepository.findOne(
        { id },
        { relations: ['episodes'] },
      );
      console.log(podcast);
      if (!podcast) {
        return {
          ok: false,
          error: 'There is not the podcast.',
        };
      }
      return {
        ok: true,
        podcast,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Cannot get the podcast.',
      };
    }
  }
  async getAllEpisodes(podcastId: number): Promise<GetAllEpisodesOutput> {
    try {
      const { podcast } = await this.getPodcast(podcastId);
      const episodes = podcast.episodes;
      return {
        ok: true,
        episodes,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Cannot get Episodes.',
      };
    }
  }
  async getEpisode({
    podcastId,
    episodeId,
  }: GetEpisodeInput): Promise<GetEpisodeOutput> {
    try {
      const { episodes, ok, error } = await this.getAllEpisodes(podcastId);
      if (!ok) {
        return {
          ok: false,
          error,
        };
      }
      const [episode] = episodes.filter((episode) => episode.id === episodeId);
      if (!episode) {
        return {
          ok: false,
          error: "There isn't the episode.",
        };
      }
      return {
        ok: true,
        episode,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Cannot find the episode.',
      };
    }
  }
  async createEpisodeRating({
    rating,
    episodeId,
    podcastId,
  }: CreateEpisodeRatingInput): Promise<CreateEpisodeRatingOutput> {
    try {
      const { episode, ok, error } = await this.getEpisode({
        podcastId,
        episodeId,
      });
      if (!ok) {
        return {
          ok,
          error,
        };
      }
      episode.rating = rating;
      await this.episodeRepository.save(episode);
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error,
      };
    }
  }
  async ratePodcast({
    rating,
    podcastId,
  }: CreatePodcastRatingInput): Promise<CreatePodcastRatingOutput> {
    try {
      const { podcast, ok, error } = await this.getPodcast(podcastId);
      if (!ok) {
        return {
          ok,
          error,
        };
      }
      podcast.rating = rating;
      await this.podcastRepository.save(podcast);
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Cannot make rating.',
      };
    }
  }
  async editPodcast(
    input: EditPodcastInput,
    host: User,
  ): Promise<EditPodcastOutput> {
    try {
      const { podcast, ok, error } = await this.getPodcast(input.podcastId);
      if (!ok) {
        return {
          ok,
          error,
        };
      }
      if (podcast.creatorId !== host.id) {
        return {
          ok: false,
          error: 'You cannot edit this podcast.',
        };
      }
      if (input.title) {
        podcast.title = input.title;
      }
      if (input.category) {
        podcast.category = input.category;
      }
      await this.podcastRepository.save(podcast);
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Cannot edit the podcast.',
      };
    }
  }
}
