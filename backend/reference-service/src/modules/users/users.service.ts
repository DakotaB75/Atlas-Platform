import { Inject, Injectable } from '@nestjs/common';
import { CACHE_SERVICE, type CacheService } from 'src/cache/cache.interfaces';
import { ApplicationLogger } from 'src/common/logging/application-logger.service';
import { UserAlreadyExistsException, UserNotFoundException } from './users.errors';
import { UpdateUserInput, USER_REPOSITORY, type CreateUserInput, type User, type UserRepository } from './users.interfaces';

const USER_CACHE_TTL_SECONDS = 300;

@Injectable()
export class UsersService {
    private readonly component = UsersService.name;

    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        @Inject(CACHE_SERVICE)
        private readonly cacheService: CacheService,
        private readonly logger: ApplicationLogger,
    ) {}

    async findAllUsers(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async findUserById(id: number): Promise<User> {
        const cacheKey = `users:${id}`;
        const cachedUser = await this.getCachedUser(cacheKey);

        if (cachedUser) {
            return cachedUser;
        }
        
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new UserNotFoundException(id);
        }

        await this.setCachedUser(cacheKey, user);

        return user;
    }

    async createUser(user: CreateUserInput): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(user.email);

        if (existingUser) {
            throw new UserAlreadyExistsException(user.email);
        }

        const createdUser = await this.userRepository.create(user);

        await this.setCachedUser(`users:${createdUser.id}`, createdUser);

        return createdUser;
    }

    async updateUser(id: number, user: UpdateUserInput): Promise<User> {
        if (user.email) {
            const userWithEmail = await this.userRepository.findByEmail(user.email);

            if (userWithEmail && userWithEmail.id !== id) {
                throw new UserAlreadyExistsException(user.email);
            }
        }

        const updatedUser = await this.userRepository.update(id, user);

        if(!updatedUser) {
            throw new UserNotFoundException(id);
        }
        
        await this.setCachedUser(`users:${id}`, updatedUser);

        return updatedUser;
    }

    async deleteUser(id: number): Promise<void> {
        const removed = await this.userRepository.delete(id);

        if(!removed) {
            throw new UserNotFoundException(id);
        }

        await this.deleteCachedUser(`users:${id}`);
    }

    private async getCachedUser(cacheKey: string): Promise<User | null> {
        try {
            return await this.cacheService.get<User>(cacheKey);
        } catch {
            this.logger.warn(this.component, 'Could not read user from cache', {
                cacheKey,
            });

            return null;
        }
    }

    private async setCachedUser(cacheKey: string, user: User): Promise<void> {
        try {
            await this.cacheService.set(cacheKey, user, USER_CACHE_TTL_SECONDS);
        } catch {
            this.logger.warn(this.component, 'Could not write user to cache', {
                cacheKey,
            });
        }
    }

    private async deleteCachedUser(cacheKey: string): Promise<void> {
        try {
            await this.cacheService.delete(cacheKey);
        } catch {
            this.logger.warn(this.component, 'Could not delete user from cache', {
                cacheKey,
            });
        }
    }
}
