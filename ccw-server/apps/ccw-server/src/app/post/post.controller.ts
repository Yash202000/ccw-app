import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';
import 'multer';

import { PostCreateDto, PostResponseDto } from './dto/post.dto';

import { PostService } from './post.service';

@ApiTags('post')
@Controller('post')
export default class PostController {
    constructor(private postService: PostService){}    
    
    @ApiOperation({ summary: 'Get post by id' })
    @ApiResponse({ status: 200, description: 'Success', type: PostResponseDto })
    @Get(':id')
    getPostById(@Param('id') id: string): Promise<PostResponseDto> {
        return this.postService.post(+id);
    }

    @ApiOperation({ summary: 'Get all posts' })
    @ApiResponse({ status: 200, description: 'Success', type: PostResponseDto })
    @Get()
    getallposts(): Promise<PostResponseDto[]> {
        return this.postService.allpost();
    }

    @ApiOperation({ summary: 'Get posts' })
    @ApiResponse({ status: 200, description: 'Success', type: [PostResponseDto] })
    @Get('feed')
    async getPublishedPosts(): Promise<PostResponseDto[]> {
        return this.postService.posts({});
    }

    @ApiOperation({ summary: 'filter post by string' })
    @ApiResponse({ status: 200, description: 'Success', type: [PostResponseDto] })
    @Get('filtered-posts/:searchString')
    async getFilteredPosts(
        @Param('searchString') searchString: string,
    ): Promise<PostResponseDto[]> {
        return this.postService.posts({
        where: {
            OR: [
            {
                title: { contains: searchString },
            },
            {
                content: { contains: searchString },
            },
            ],
        },
        });
    }




    @ApiOperation({ summary: 'Create post' })
    @ApiBody({ type: PostCreateDto })
    @ApiConsumes('multipart/form-data') // Specify the media type for file upload
    @UseInterceptors(FileInterceptor('file'))
    @ApiResponse({
        status: 201,
        description: 'Success',
        type: PostResponseDto,
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async createDraft(
        @Body() postData: PostCreateDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: '.(png|jpeg|jpg)',
            },)
            .addMaxSizeValidator({
                maxSize: 1048576 //1Mb
            })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }),
        )
        file: Express.Multer.File,
    ): Promise<PostResponseDto> {
        console.log(postData);
      
        return this.postService.createPost(postData,file);
    }



    @ApiOperation({ summary: 'Update post or publish' })
    @ApiParam({ name: 'id', type: 'string', description: 'Example ID: 1' })
    @ApiResponse({
        status: 201,
        description: 'Success',
        type: PostResponseDto,
    })
    @HttpCode(HttpStatus.CREATED)
    @Put('publish/:id')
    async publishPost(@Param('id') id: string): Promise<PostResponseDto> {
        return this.postService.updatePost({
            where: { id: Number(id) },
            data: { published: true },
        });
    }


    @ApiOperation({ summary: 'Delete post' })
    @ApiParam({ name: 'id', type: 'string', description: 'Example ID: 1' })
    @ApiResponse({ status: 204, description: 'No Content' })
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('post/:id')
    async deletePost(@Param('id') id: string): Promise<PostResponseDto> {
        return this.postService.deletePost({ id: Number(id) });
      }
}
