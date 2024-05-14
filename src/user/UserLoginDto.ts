import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class UserLoginDto {
    @IsString()
    @ApiProperty({
        description: "email",
        type: String
    })
    email: string
    @IsString()
    @ApiProperty({
        description: "password",
        type: String
    })
    password: string
}