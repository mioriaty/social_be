export default class RegisterDTO {
  public first_name: string;
  public last_name: string;
  public email: string;
  public password: string;

  constructor(model: RegisterDTO) {
    this.first_name = model.first_name;
    this.last_name = model.last_name;
    this.email = model.email;
    this.password = model.password;
  }
}
