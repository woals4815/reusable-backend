import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dtos/create-podcast.dto';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastsService {
  constructor(
    @InjectRepository(Podcast)
    private podcastRepository: Repository<Podcast>,
  ) {}
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
}
