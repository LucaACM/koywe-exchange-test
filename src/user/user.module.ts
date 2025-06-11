import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
} from './model/user.model';
import { UserRepositoryService } from './services/user-repository.service';
import { UserApplicationService } from './services/user-application.service';
import { UserController } from './controller/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [
    UserRepositoryService,
    UserApplicationService,
  ],
  controllers: [UserController],
  exports: [UserRepositoryService],
})
export class UserModule {}
