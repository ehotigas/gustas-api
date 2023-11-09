import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { User } from "./User";

export class GetAllUsersResponseDto {
    @ApiProperty({
        type: 'array',
        items: { $ref: getSchemaPath(User) }
    })
    users: Partial<User>[]
}