import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '../../common/dto/error-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';
import type { User } from './users.interfaces';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'List users' })
  @ApiOkResponse({
    description: 'Users returned successfully.',
    type: UserResponseDto,
    isArray: true,
  })
  @Get()
  findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @ApiOperation({ summary: 'Get a user by id' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'User identifier.',
  })
  @ApiOkResponse({
    description: 'User returned successfully.',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid user id.',
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'User was not found.',
    type: ErrorResponseDto,
    schema: {
      example: {
        errorCode: 'user/not-found',
        errorMsg: 'User with id 1 was not found',
      },
    },
  })
  @Get(':id')
  findUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findUserById(id);
  }

  @ApiOperation({ summary: 'Create a user' })
  @ApiCreatedResponse({
    description: 'User created successfully.',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Request body validation failed.',
    type: ErrorResponseDto,
  })
  @ApiConflictResponse({
    description: 'A user with the same email already exists.',
    type: ErrorResponseDto,
    schema: {
      example: {
        errorCode: 'user/already-exists',
        errorMsg: 'User with email foo@example.com already exists',
      },
    },
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.createUser(user);
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'User identifier.',
  })
  @ApiOkResponse({
    description: 'User updated successfully.',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid user id or request body validation failed.',
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'User was not found.',
    type: ErrorResponseDto,
    schema: {
      example: {
        errorCode: 'user/not-found',
        errorMsg: 'User with id 1 was not found',
      },
    },
  })
  @ApiConflictResponse({
    description: 'A user with the same email already exists.',
    type: ErrorResponseDto,
    schema: {
      example: {
        errorCode: 'user/already-exists',
        errorMsg: 'User with email foo.updated@example.com already exists',
      },
    },
  })
  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, user);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'User identifier.',
  })
  @ApiNoContentResponse({
    description: 'User deleted successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid user id.',
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'User was not found.',
    type: ErrorResponseDto,
    schema: {
      example: {
        errorCode: 'user/not-found',
        errorMsg: 'User with id 1 was not found',
      },
    },
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
