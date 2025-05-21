import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export default class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  public email: string = '';

  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password must be at least 6 characters',
  })
  public password: string = '';

  constructor(model?: Partial<LoginDTO>) {
    if (model) {
      this.email = model.email || this.email;
      this.password = model.password || this.password;
    }
  }
}
