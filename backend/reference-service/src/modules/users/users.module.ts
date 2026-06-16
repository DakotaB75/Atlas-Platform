import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { USER_REPOSITORY } from './users.interfaces';
import { TypeOrmUserRepository } from './repositories/user.repository';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, { provide: USER_REPOSITORY, useClass: TypeOrmUserRepository }]
})
export class UsersModule {}
