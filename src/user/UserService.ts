import { CreateUserDto } from './CreateUserDto';
import { UpdateUserDto } from "./UpdateUserDto";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { User } from "./User";



interface UserServiceInterface {

}

@Injectable()
export class UserService implements UserServiceInterface {
    constructor(
        @InjectModel(User.name) private repository: Model<User>
    ) {  }

    async findAll(): Promise<Partial<User>[]> {
        return await this.repository.find();
    }
    
    async find(id: string): Promise<Partial<User>> {
        return await this.repository.findById(id);
    }

    async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
        const user: User = {
            ...createUserDto,
            _id: new mongoose.Types.ObjectId(),
            when: new Date()
        }
        return await this.repository.create(user);
    }

    async update(id: string, updateUserDto: Partial<UpdateUserDto>): Promise<Partial<User>> {
        let user: User = await this.repository.findById(id);
        user = {
            /* @ts-ignore */
            ...{...user }._doc,
            ...updateUserDto
        };
        await this.repository.updateOne({ _id: id }, user);
        return user;
    }

    async delete(id: string) {
        await this.repository.deleteOne({ _id: id });
    }

    async login(email: string, password: string): Promise<Partial<User> | void> {
        const user: any = await this.repository.find({ email: email });
        if (user && user.password == password) return user; 
    }
} 