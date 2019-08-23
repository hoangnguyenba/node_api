import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service'

@Controller()
export class AppController {

  constructor(private readonly authService: AuthService) {}

  @Get('/')
  getHello() {
    return {
      status: 'Your API is ready!'
    };
  }
}