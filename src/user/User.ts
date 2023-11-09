import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import * as mongoose from "mongoose";

@Schema({ collection: "User" })
export class User {
    @Prop({
        type: mongoose.Schema.Types.ObjectId
    })
    @ApiProperty({
        description: "User id",
        type: mongoose.Types.ObjectId
    })
    _id: mongoose.Types.ObjectId;

    @Prop({
        required: true,
        type: String
    })
    @ApiProperty({
        description: "User name",
        type: String
    })
    username: string;

    @Prop({
        required: true,
        type: String
    })
    @ApiProperty({
        description: "User password",
        type: String
    })
    password: string;

    @Prop({
        required: true,
        type: String
    })
    @ApiProperty({
        description: "User email",
        type: String
    })
    email: string;

    @Prop({
        required: true,
        type: Date
    })
    @ApiProperty({
        description: "User created date",
        type: Date
    })
    when: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
