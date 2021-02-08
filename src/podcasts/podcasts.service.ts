import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
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
}
