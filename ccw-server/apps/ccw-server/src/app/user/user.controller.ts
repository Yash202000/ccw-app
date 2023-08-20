import {
    Controller,
    Get,
    Param,
    Post,
    Body,
   // Put,
    Delete,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
import {
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UserResponseDto } from './dto/user.dto';


@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'Get all the users' })
    @ApiResponse({ status: 200, description: 'Success', type: [UserResponseDto] })    
    @Get()
    async getUsers(): Promise<UserResponseDto[]>{
        return this.userService.users({});
    }

    
    @ApiOperation({ summary: 'Get user by id' })
    @ApiParam({ name: 'id', type: 'string', description: 'Example ID: 1' })
    @ApiResponse({ status: 200, description: 'Success', type: UserResponseDto })
    @Get(':id')
    async getUserById(@Param('id') id:number): Promise<UserResponseDto>{
        return this.userService.user(+id);
    }



    @ApiOperation({ summary: 'Create user' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
        status: 201,
        description: 'Success',
        type: UserResponseDto,
    })
    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    async signupUser(
        @Body() userData: CreateUserDto,
    ): Promise<UserResponseDto> {
        return this.userService.createUser(userData);
    }



    @ApiOperation({ summary: 'Login user' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
        status: 201,
        description: 'Success',
        type: UserResponseDto,
    })
    @HttpCode(HttpStatus.CREATED)
    @Post('signin')
    async signinUser(
        @Body() userData: CreateUserDto,
    ): Promise<UserResponseDto> {
        return this.userService.loginUser(userData);
    }


    //TODO : put method to change user password or forgot password.


    @ApiOperation({ summary: 'Delete user' })
    @ApiParam({ name: 'id', type: 'string', description: 'Example ID: 1' })
    @ApiResponse({ status: 204, description: 'No Content' })
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteUser(@Param('id') id: number) {
        return this.userService.deleteUser({id:Number(id)})
    }

//https://youtu.be/qlELLikT3FU

// get user's current location and then give them the route for destination.
// https://blog.logrocket.com/react-native-geolocation-complete-tutorial/

}
