import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from './core.dto';

// @InputType()
// export class ToggleSubscribeInput {
//   @Field((type) => Number)
//   podcastId: number;
// }

@ObjectType()
export class ToggleSubscribeOutput extends CoreOutput {}
