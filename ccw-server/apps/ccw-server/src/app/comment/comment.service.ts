import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Http2ServerRequest } from 'http2';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  private prismaService = new PrismaClient();

  create(createCommentDto: CreateCommentDto) {
    const user = this.prismaService.user.findUnique({where:{
      id: createCommentDto.userId
    }})
    if(!user) throw new  HttpException('user not found',HttpStatus.NOT_FOUND);

    const post = this.prismaService.post.findUnique({
      where: {
        id: createCommentDto.postId
      }
    })
    if(! post)  throw new  HttpException('post not found',HttpStatus.NOT_FOUND);

    return this.prismaService.comment.create({
      data : createCommentDto
    })
  }

  findAll() {
    return this.prismaService.comment.findMany({

    })
  }

  findOne(id: number) {
    return this.prismaService.comment.findUnique({
      where: {
        id: id
      }
    })
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.prismaService.comment.update({
      where: {id: id},
      data: updateCommentDto
    });
  }

  remove(id: number) {
    return this.prismaService.comment.delete({
      where:{
        id: id
      }
    })
  }
}
