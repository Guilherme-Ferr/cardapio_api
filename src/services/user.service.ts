import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { User, UserDocument } from '../domain/schemas/user.schema';
import { TOKEN_SECRET } from '../configs/constants';
import { AuthenticationRequest } from '../presentation/requests/authentication-request';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findUserByUsernameAndPassword({
    username,
    password,
  }: AuthenticationRequest): Promise<User> {
    try {
      const user = await this.userModel.findOne({ username }).exec();
      if (!user) throw new NotFoundException('User not found!');
      const verifyPassword = await compare(password, user.pass);
      if (!verifyPassword) throw new NotFoundException('User not found!');
      return {
        id: user._id,
        username: user.username,
        role: user.role,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createUserToken(user: User): Promise<string> {
    try {
      const token = sign({ user }, TOKEN_SECRET, {
        subject: String(user.id),
        expiresIn: '30h',
      });
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
