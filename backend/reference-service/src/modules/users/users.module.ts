import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { USER_REPOSITORY } from './users.interfaces';
import { TypeOrmUserRepository } from './repositories/user.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, { provide: USER_REPOSITORY, useClass: TypeOrmUserRepository }]
})
export class UsersModule {}
