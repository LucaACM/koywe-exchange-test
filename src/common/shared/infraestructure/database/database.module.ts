import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(<string>process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB,
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
