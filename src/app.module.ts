import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth';
import { UsersModule } from './users';
import { ConfigModule } from './config';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
