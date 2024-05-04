import { Body, Controller, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

export interface UserCreateDTO {
  email: string;
  name: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Post('sign-up')
  async signUp(@Body() body: UserCreateDTO) {
    this.eventEmitter.emit('user.welcome', {
      name: body.name,
      email: body.email,
    });
  }
}
