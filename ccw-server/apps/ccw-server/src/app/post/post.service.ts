import { Injectable } from '@nestjs/common';
import { PrismaClient,Prisma ,Post} from '@prisma/client';
import { FilterPostsResponseDto, PostCreateDto, PostResponseDto } from './dto/post.dto';

@Injectable()
export class PostService {
    private prismaService = new PrismaClient()


    post(id: number): Promise<PostResponseDto | null> {
      return this.prismaService.post.findUnique({
        where: {
            id: id
        },
      });
    }
    allpost(){
      return this.prismaService.post.findMany({});
    }
  
    async posts(params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.PostWhereUniqueInput;
      where?: Prisma.PostWhereInput;
      orderBy?: Prisma.PostOrderByWithRelationInput;
    }): Promise<PostResponseDto[]> {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prismaService.post.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    }

    async getFilteredPosts(
      pageSize: number,
      pageOffset: number,
      city: string,
      title: string,
      content: string,
      sortBy: string,
      sortOrder: 'asc' | 'desc'
    ): Promise<FilterPostsResponseDto> {
      const whereArray = [];
      let whereQuery = {};
  
      //TODO: just uncomment and you will get for and query in findmany
      if (city !== undefined) {
        whereArray.push({ city:  city  });
      }
  
      if (title !== undefined) {
        whereArray.push({ title: { contains: title } });
      }

      if (content !== undefined) {
        whereArray.push({ content: { contains: content } });
      }
  
      if (whereArray.length > 0) {
        if (whereArray.length > 1) {
          whereQuery = { AND: whereArray };
        } else {
          whereQuery = whereArray[0];
        }
      }
      console.log(whereQuery);
  
      const sort = (sortBy ? sortBy : 'id').toString();
      const order = sortOrder ? sortOrder : 'asc';
      const size = pageSize ? pageSize : 10;
      const offset = pageOffset ? pageOffset : 0;
      const orderBy = { [sort]: order };
      const count = await this.prismaService.post.count({
        where: whereQuery,
      });
  
      const posts = await this.prismaService.post.findMany({
        // select: { id: true, name: true, type: true },
        where: whereQuery,
        take: Number(size),
        skip: Number(size * offset),
        orderBy,
      });
      return {
        size: size,
        number: offset,
        total: count,
        sort: [
          {
            by: sort,
            order: order,
          },
        ],
        content: posts,
      };
    }
  
  
    createPost(data: PostCreateDto,file): Promise<PostResponseDto> {
      
      //TODO : handle file upload to blob storage and get the imageurl for the post.
      console.log(file);
      // const imageurl = data.file.filename;
      const imageurl = file.originalname
      // console.log(imageurl);

      return this.prismaService.post.create({
        data:{
            title: data.title,
            content: data.content,
            imageUrl: imageurl,
            city: data.city,
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
            published: Boolean(data.published),
            authorId: Number(data.authorId)
        },
      });
    }
  
    async updatePost(params: {
      where: Prisma.PostWhereUniqueInput;
      data: Prisma.PostUpdateInput;
    }): Promise<PostResponseDto> {
      const { data, where } = params;
      return this.prismaService.post.update({
        data,
        where,
      });
    }
  
    async deletePost(where: Prisma.PostWhereUniqueInput): Promise<PostResponseDto> {
      return this.prismaService.post.delete({
        where,
      });
    }
  }