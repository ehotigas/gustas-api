import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Patch, Post, ValidationPipe } from "@nestjs/common";
import { ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetAllUsersResponseDto } from "./GetAllUsersResponseDto";
import { UpdateUserDto } from "./UpdateUserDto";
import { CreateUserDto } from "./CreateUserDto";
import { UserService } from "./UserService";
import { User } from "./User";
import { UserLoginDto } from "./UserLoginDto";

@ApiTags('User')
@ApiExtraModels(User)
@Controller("user")
export class UserController {
    constructor(
        @Inject("UserServiceInterface")
        private readonly service: UserService
    ) {  }
    
    @Get('/')
    @ApiOkResponse({
        status: 200,
        type: GetAllUsersResponseDto
    })
    async findAll(): Promise<GetAllUsersResponseDto> {
        return {
            users: await this.service.findAll()
        }
    }
    
    @Get('/:id')
    @ApiOkResponse({
        status: 200,
        type: User
    })
    async find(
        @Param('id') id: string
    ): Promise<Partial<User>> {
        return await this.service.find(id);
    }

    @Post('/')
    @ApiCreatedResponse({
        status: 201,
        type: User
    })
    async create(
        @Body(new ValidationPipe()) createUserDto: CreateUserDto
    ): Promise<Partial<User>> {
        const user: Omit<User, '_id'> = {
            ...createUserDto,
            when: new Date()
        }
        return await this.service.create(user);
    }

    @Patch('/:id')
    @ApiOkResponse({
        status: 200,
        type: User
    })
    async patch(
        @Param('id') id: string,
        @Body(new ValidationPipe()) updateUserDto: UpdateUserDto
    ): Promise<Partial<User>> {
        return await this.service.update(id, updateUserDto);
    }

    @Delete('/:id')
    @HttpCode(204)
    @ApiOkResponse({ status: 204 })
    async delete(@Param('id') id: string) {
        await this.service.delete(id);
    }

    @Post('/login')
    @ApiOkResponse({
        status: 200,
        type: User
    })
    async login(
        @Body(new ValidationPipe()) userLoginDto: UserLoginDto
    ) {
        const res = await this.service.login(userLoginDto.email, userLoginDto.password);
        return res;
    }
}

