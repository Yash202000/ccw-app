import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import {  FeedbackCreateDto, FeedbackResponseDto } from './dto/feedback.dto';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
    constructor(private feedbackService: FeedbackService  ){}

    @ApiOperation({ summary: 'give feedback' })
    @ApiBody({ type: FeedbackCreateDto })
    @ApiResponse({
        status: 201,
        description: 'Success',
        type: FeedbackResponseDto,
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async giveFeedback(
        @Body() data: FeedbackCreateDto,
    ): Promise<FeedbackResponseDto> {
        return this.feedbackService.giveFeedback(data);
    }

}
