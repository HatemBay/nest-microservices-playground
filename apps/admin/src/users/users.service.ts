import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ForbiddenError } from '@casl/ability';
import {
  AbilityFactory,
  Action,
} from '../ability/ability.factory/ability.factory';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private abilityFactory: AbilityFactory
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
    currentUser: User
  ): Promise<User> {
    const ability = this.abilityFactory.defineAbility(currentUser);

    const newUser = this.usersRepository.create(createUserDto);

    // * if we don't specify cannot() and because('') in the factory we instead use .SetMessage('') after .from()
    ForbiddenError.from(ability).throwUnlessCan(Action.Create, newUser);
    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['roles'] });
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneOrFail({
      where: { id: id },
      relations: ['roles'],
    });
    return user;
  }

  // @OnEvent('findOneByUserName', { async: true })
  async findOneByUserName2({ username }: { username: string }): Promise<User> {
    const user = await this.usersRepository.findOneOrFail({
      where: { username: username },
      relations: ['roles'],
    });
    return user;
  }

  async findOneByUserName(username): Promise<User> {
    const user = await this.usersRepository.findOneOrFail({
      where: { username: username },
      relations: ['roles'],
    });
    return user;
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
    currentUser: User
  ): Promise<User> {
    const ability = this.abilityFactory.defineAbility(currentUser);

    const userToUpdate = await this.findOneById(id);
    if (userToUpdate) {
      ForbiddenError.from(ability).throwUnlessCan(Action.Update, userToUpdate);

      return await this.usersRepository.save({
        ...userToUpdate,
        ...updateUserDto,
      });
    }
  }

  async removeUser(id: number): Promise<User> {
    const user = await this.findOneById(id);

    return await this.usersRepository.remove(user);
  }
}
