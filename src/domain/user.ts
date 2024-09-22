export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export class User implements IUser {
  public id?: string;
  public name: string;
  public email: string;
  public password: string;
  public createdAt: Date;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
    this.password = password;
  }
}
