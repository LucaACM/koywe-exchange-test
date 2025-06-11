import { Module } from '@nestjs/common';
import { QuoteModule } from './quote/quote.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './common/shared/infraestructure/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    UserModule,
    QuoteModule,
  ],
})
export class AppModule {}
