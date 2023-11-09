import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/UserModule';

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://ehotigas:tw39026928tw@cluster0.etsfwi4.mongodb.net/?retryWrites=true&w=majority"
    ),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
