import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./UserController";
import { UserService } from "./UserService";
import { User, UserSchema } from "./User";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ])
    ],
    controllers: [UserController],
    providers: [
        {
            provide: "UserServiceInterface",
            useClass: UserService   
        }
    ]
})
export class UserModule {

}