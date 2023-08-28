import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { ProductsModule } from '../products/products.module';
import { AbilityModule } from '../ability/ability.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { RolesModule } from '../roles/roles.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AbilityGuard } from '../ability/ability.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ProductsModule,
    AbilityModule,
    UsersModule,
    AuthModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AbilityGuard,
    },
  ],
})
export class AppModule {}
