import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  getAllUsers(): Promise<User[]> {
    try {
      const users = this.usersRepository.find();
      if (users) {
        return users;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async createUser(
    createUserinput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    try {
      const userExist = await this.usersRepository.findOne({
        email: createUserinput.email,
      });
      console.log(userExist);
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
}
