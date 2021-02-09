import { InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/users/dtos/core.dto';
import {
  CreateEpisodeRatingInput,
  CreatePodcastRatingInput,
} from '../dtos/create-rating.dto';

@InputType()
export class EditPodcastRatingInput extends CreatePodcastRatingInput {}

@InputType()
export class EditEpisodeRatingInput extends CreateEpisodeRatingInput {}

@ObjectType()
export class EditPodcastRatingOutput extends CoreOutput {}

@ObjectType()
export class EditEpisodeRatingOutput extends CoreOutput {}
