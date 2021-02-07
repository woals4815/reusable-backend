import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { Repository } from 'typeorm';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
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
}
