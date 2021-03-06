import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { PodcastsService } from 'src/podcasts/podcasts.service';
import { Repository } from 'typeorm';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { GetWatchedEpisodesOutput } from './dtos/get-watched-episodes.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import {
  MarkWatchedEpisodeInput,
  MarkWatchedEpisodeOutput,
} from './dtos/mark-watched.dto';
import { GetSubscriptionOutput } from './dtos/subscriptions.dto';
import { ToggleSubscribeOutput } from './dtos/toggle-subscribe.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly podcastService: PodcastsService,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(
    createUserinput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    try {
      const userExist = await this.usersRepository.findOne({
        email: createUserinput.email,
      });
      if (userExist) {
        return {
          ok: false,
          error: 'Already user exists with the email.',
        };
      }
      const user = await this.usersRepository.create(createUserinput);
      await this.usersRepository.save(user);
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Cannot create user.',
      };
    }
  }
  async login(loginInput: LoginInput): Promise<LoginOutput> {
    const { email, password } = loginInput;
    //1. if cannot find user, return false
    const user = await this.usersRepository.findOne({ email: email });
    if (!user) {
      return {
        ok: false,
        error: 'User not found.',
      };
    }
    //2. compare input's password with the password in db
    const ok = user.checkPassword(password);
    if (!ok) {
      return {
        ok: false,
        error: 'Password is not correct.',
      };
    }
    const token = this.jwtService.sign({ id: user.id });
    return {
      ok: true,
      token,
    };
  }
  async findById(
    id: number,
  ): Promise<{ user?: User; ok: boolean; error?: string }> {
    const user = await this.usersRepository.findOne(
      { id },
      { relations: ['subscribedPodcast'] },
    );
    if (!user) {
      return {
        ok: false,
        error: 'User not found.',
      };
    }
    return {
      user,
      ok: true,
    };
  }
  async editProfile(
    input: EditProfileInput,
    user: User,
  ): Promise<EditProfileOutput> {
    try {
      const { user: userFound, ok, error } = await this.findById(user.id);
      const userExist = await this.usersRepository.findOneOrFail({
        email: input.email,
      });
      if (userExist) {
        return {
          ok: false,
          error: 'User exists.',
        };
      }
      if (!ok) {
        return {
          ok,
          error,
        };
      }
      if (userFound.id !== user.id) {
        return {
          ok: false,
          error: 'You cannot edit this profile',
        };
      }
      if (input.email) {
        userFound.email = input.email;
      }
      if (input.password) {
        userFound.password = input.password;
      }
      await this.usersRepository.save(userFound);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot edit your profile.',
      };
    }
  }
  async toggleSubscribe(
    podcastId: number,
    user: User,
  ): Promise<ToggleSubscribeOutput> {
    try {
      const {
        podcast: podcastExist,
        ok,
        error,
      } = await this.podcastService.findPodcastById(podcastId);
      if (!ok) {
        return {
          ok,
          error,
        };
      }
      if (
        user.subscribedPodcast.find((podcast) => podcast.id === podcastExist.id)
      ) {
        user.subscribedPodcast = user.subscribedPodcast.filter(
          (podcast) => podcast.id !== podcastId,
        );
        await this.usersRepository.save(user);
        return {
          ok: true,
        };
      }
      user.subscribedPodcast.push(podcastExist);
      await this.usersRepository.save(user);
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Cannot subscribe the podcast.',
      };
    }
  }
  async getSubscriptions(user: User): Promise<GetSubscriptionOutput> {
    try {
      const subscriptions = user.subscribedPodcast;
      console.log(subscriptions);
      return {
        ok: true,
        subscriptions,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Cannot get podcasts.',
      };
    }
  }
  async markWatchedEpisode(
    input: MarkWatchedEpisodeInput,
    user: User,
  ): Promise<MarkWatchedEpisodeOutput> {
    try {
      const {
        episode: episodeExist,
        ok,
        error,
      } = await this.podcastService.getEpisode(input);
      if (!ok) {
        return {
          ok,
          error,
        };
      }
      if (
        user.watchedEpisodes.find((episode) => episode.id === episodeExist.id)
      ) {
        return {
          ok: true,
        };
      }
      user.watchedEpisodes.push(episodeExist);
      await this.usersRepository.save(user);
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Cannot mark the episode watcehd.',
      };
    }
  }
  async getWatchedEpisodes(user: User): Promise<GetWatchedEpisodesOutput> {
    try {
      const episodesWatched = user.watchedEpisodes;
      return {
        ok: true,
        watchedEpisodes: episodesWatched,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Cannot get episodes watched.',
      };
    }
  }
}
