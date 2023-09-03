import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaClient ,Prisma,User} from '@prisma/client'
import { AuthService } from '../core/auth/auth.service';
import { CreateUserDto, LoginUserResponse, UserResponseDto } from './dto/user.dto';


@Injectable()
export class UserService {
    constructor(private authService: AuthService){}


    private prismaService = new PrismaClient()
  
    async user(
        id:number,
      ): Promise<UserResponseDto | null> {
        const user = this.prismaService.user.findUnique({
            where: {
              id: id
            },
            select:{
                id: true,
                email: true,
                timestamp: true
            }
          });
        if(!user) throw new HttpException("User not found",HttpStatus.NOT_FOUND);
        return user
      }

   users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UserResponseDto[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: {
        id: true,
        email: true,
        timestamp: true
    },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {

    const existingUser = await this.prismaService.user.findFirst({
      where:{
        email: createUserDto.email
      }
    })
    if(existingUser) throw new HttpException("user already exist please signin",HttpStatus.BAD_REQUEST)


    const userPassword = await this.authService.hashPassword(createUserDto.password);
    
    
    const user =  await this.prismaService.user.create({
      data:{
        email: createUserDto.email,
        password: userPassword,

      },
    });
    if(!user) throw new HttpException("User creation error",HttpStatus.BAD_REQUEST);
    const profile = await this.prismaService.userProfile.create({
      data: {
        userId: Number(user.id)
      }
    })

    return {
        id: user.id,
        email: user.email,
        timestamp: user.timestamp
    }
  }

  
  async loginUser(userDto: CreateUserDto): Promise<LoginUserResponse> {

    // const userPassword = await this.authService.hashPassword(userDto.password);
    // console.log(userPassword);
    
    const user =  await this.prismaService.user.findFirst({
      where:{
        email: userDto.email
      },
    });
    
    if(!user) throw new HttpException("User not found",HttpStatus.NOT_FOUND);
    const usrpass = this.authService.comparePasswords(userDto.password,user.password);

    if(!usrpass) throw new HttpException("Incorrect password",HttpStatus.NOT_FOUND);
    const user_profile = await this.prismaService.userProfile.findFirst({
      where: {
        userId: user.id
      }
    })
    
    if(!user_profile) throw new HttpException("profile not found while login",HttpStatus.NOT_FOUND);
    
    return {
        id: String(user.id),
        email: user.email,
        timestamp: String(user.timestamp)
    }
  }


  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prismaService.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.user.delete({
      where,
    });
  }
}
