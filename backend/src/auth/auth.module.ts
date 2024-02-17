import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import {UsersService} from "../users/users.service";
import {WishesService} from "../wishes/wishes.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import {Wish} from "../wishes/entities/wish.entity";
import {User} from "../users/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Wish]),
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    ConfigService,
    UsersService,
    WishesService,
  ],
  exports: [AuthService, AuthModule],
})
export class AuthModule {}
