import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDto {
    @ApiProperty() email: string;
    @ApiProperty() password: string;
}

export class UserResponseDto{
    @ApiProperty() id: number
    @ApiProperty()  email: string
    @ApiProperty() timestamp: Date
}