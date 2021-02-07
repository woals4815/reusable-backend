import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from './jwt.constant';
import { JwtConfigOptions } from './jwt.interface';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtConfigOptions,
  ) {}
  // eslint-disable-next-line @typescript-eslint/ban-types
  sign(payload: object): string {
    return jwt.sign(payload, this.options.priavateKey);
  }
  verify(token: string) {
    return jwt.verify(token, this.options.priavateKey);
  }
}
