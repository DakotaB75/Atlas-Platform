import { Inject, Injectable } from '@nestjs/common';
import { User, USER_REPOSITORY, type UserRepository } from './users.interfaces';
import { CACHE_SERVICE, type CacheService } from 'src/cache/cache.interfaces';
import { UserNotFoundException } from './users.errors';

@Injectable()
export class UsersService {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        @Inject(CACHE_SERVICE)
        private readonly cacheService: CacheService
    ) {}

    async findAllUsers(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    async findUserById(id: number): Promise<User> {
        const user = await this.userRepository.findById(id);

        if(!user) {
            throw new UserNotFoundException(id);
        }

        return user;
    }
}
