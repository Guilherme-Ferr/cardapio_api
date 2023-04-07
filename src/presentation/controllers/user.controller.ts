import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { UserDocument } from 'src/domain/schemas/user.schema';
import { UserService } from 'src/services/user.service';
import { AuthenticationRequest } from '../requests/authentication-request';
import { AuthenticationResponse } from '../responses/authentication-response';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('auth/login')
  @UseInterceptors(NotFoundException)
  async authenticate(
    @Body() body: AuthenticationRequest,
  ): Promise<AuthenticationResponse> {
    const user = await this.userService.findUserByUsernameAndPassword(body);
    const token = await this.userService.createUserToken(user as UserDocument);
    return { token };
  }
}
