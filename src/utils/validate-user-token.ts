import { JwtPayload, verify } from 'jsonwebtoken';
import { TOKEN_SECRET } from '../configs/constants';
import {
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

export async function validateUserIsAdmin(token: string): Promise<void> {
  if (!token) throw new NotFoundException('Token not provided!');
  try {
    const verifyedToken = verify(token, TOKEN_SECRET);
    const { user } = verifyedToken as JwtPayload;
    if (user?.role !== 'Admin') {
      throw new UnauthorizedException('User unauthorized!');
    }
  } catch (error) {
    throw new BadRequestException('Token malformed or invalid!');
  }
}

export async function validateTokenParams(token: string): Promise<void> {
  if (!token) throw new NotFoundException('Token not provided!');
  try {
    const verifyedToken = verify(token, TOKEN_SECRET);
    if (!verifyedToken) {
      throw new UnauthorizedException('User unauthorized!');
    }
  } catch (error) {
    throw new BadRequestException('Token malformed or invalid!');
  }
}
