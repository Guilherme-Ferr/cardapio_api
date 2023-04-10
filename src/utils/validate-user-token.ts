import { JwtPayload, verify } from 'jsonwebtoken';
import {
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

export async function validateUserIsAdmin(token: string): Promise<void> {
  if (!token) throw new NotFoundException('Token not provided!');
  try {
    const verifyedToken = verify(token, '13a0c5d912d49ac040139134b2da6a86');
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
    const verifyedToken = verify(token, '13a0c5d912d49ac040139134b2da6a86');
    if (!verifyedToken) {
      throw new UnauthorizedException('User unauthorized!');
    }
  } catch (error) {
    throw new BadRequestException('Token malformed or invalid!');
  }
}
