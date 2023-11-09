import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @ApiProperty({
        description: "User name",
        type: String
    })
    username: string;

    @IsString()
    @ApiProperty({
        description: "User password",
        type: String
    })
    password: string;

    @IsString()
    @ApiProperty({
        description: "User email",
        type: String
    })
    email: string;
}