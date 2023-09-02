import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUpvoteDto } from './dto/create-upvote.dto';


@Injectable()
export class UpvoteService {
  private prismaService = new PrismaClient()

  create(createUpvoteDto: CreateUpvoteDto) {
    const user = this.prismaService.user.findUnique({
      where: {
        id: createUpvoteDto.userId
      }
    })
    if(!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    const post = this.prismaService.post.findUnique({
      where: {
        id: createUpvoteDto.postId
      }
    })
    if(!post) throw new HttpException('post not found', HttpStatus.NOT_FOUND);
    return this.prismaService.upvote.create({
      data: createUpvoteDto
    })
  }

  findAll() {
    return this.prismaService.upvote.findMany({});
  }

  findOne(id: number) {
    return this.prismaService.upvote.findUnique({
      where: {
        id: id
      }
    })
  }


  remove(id: number) {
    return this.prismaService.upvote.delete({
      where: {
        id: id
      }
    });
  }
}
