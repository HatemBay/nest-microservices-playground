import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { skipAuth } from './skip-auth.decorator';
import { AuthService } from '../auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @skipAuth()
  @Post('login')
  login(@Req() req): any {
    return this.authService.login(req.user);
  }

  @Get()
  getData() {
    return this.appService.getData();
  }
}
