import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export default class RegisterDTO {
  @IsNotEmpty()
  public first_name: string = '';

  @IsNotEmpty()
  public last_name: string = '';

  @IsNotEmpty()
  @IsEmail()
  public email: string = '';

  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password must be at least 6 characters',
  })
  public password: string = '';

  constructor(model?: Partial<RegisterDTO>) {
    if (model) {
      this.first_name = model.first_name || this.first_name;
      this.last_name = model.last_name || this.last_name;
      this.email = model.email || this.email;
      this.password = model.password || this.password;
    }
  }
}
