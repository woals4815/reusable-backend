import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from './jwt.constant';
import { JwtConfigOptions } from './jwt.interface';
import { JwtService } from './jwt.service';

@Global()
@Module({})
export class JwtModule {
  static forRoot(options: JwtConfigOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        JwtService,
      ],
      exports: [JwtService],
    };
  }
}
