import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(where: FindOptionsWhere<User>): Promise<User | null> {
    return this.userRepository.findOne({
      where,
    });
  }

  async create(user: DeepPartial<User>): Promise<User> {
    const userEntity = this.userRepository.create(user);
    return this.userRepository.save(userEntity);


  }
}
