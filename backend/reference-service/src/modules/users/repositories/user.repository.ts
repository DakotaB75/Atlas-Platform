import { Injectable } from "@nestjs/common";
import { CreateUserInput, UpdateUserInput, User, UserRepository } from "../users.interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>,
    ) { }

    async findAll(): Promise<User[]> {
        return await this.repository.find();
    }

    async findById(id: number): Promise<User | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.repository.findOne({ where: { email } });
    }

    async create(user: CreateUserInput): Promise<User> {
        return await this.repository.save(user);
    }

    async update(id: number, input: UpdateUserInput): Promise<User | null> {
        const user = await this.repository.findOneBy({ id });

        if (!user) {
            return null;
        }

        const updatedUser = this.repository.merge(user, input);

        return this.repository.save(updatedUser);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);

        return Boolean(result.affected);
    }

}