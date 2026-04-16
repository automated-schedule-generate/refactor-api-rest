import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SessionModel } from '@models';
import { AuthController } from '@controllers';
import { SessionRepository } from '@repositories';
import { SessionRepositoryImpl } from '@repositories.impl';
import { AuthService } from '@services';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@guards';
import { UserModule } from '@modules';
import { APP_GUARD } from '@nestjs/core';
import { LoginUseCase, MeUseCase } from '@use-cases';
import { RefreshTokenUseCase } from './application/use-cases/refresh-token.use-case';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([SessionModel]),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          expiresIn: configService.get<string>('jwt.expires_in') as any,
        },
      }),
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: SessionRepository,
      useClass: SessionRepositoryImpl,
    },
    AuthService,
    LoginUseCase,
    MeUseCase,
    RefreshTokenUseCase,
  ],
  exports: [
    {
      provide: SessionRepository,
      useClass: SessionRepositoryImpl,
    },
  ],
})
export class AuthModule {}
