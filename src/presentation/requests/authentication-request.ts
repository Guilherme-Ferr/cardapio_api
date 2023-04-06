import { IsNotEmpty, Length } from 'class-validator';

export class AuthenticationRequest {
  @IsNotEmpty({
    message: 'The username should not be empty',
  })
  @Length(1, 100)
  username: string;

  @IsNotEmpty({
    message: 'The username should not be empty',
  })
  @Length(1, 255)
  password: string;
}
