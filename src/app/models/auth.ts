export interface IAuth {
  login: string;
  password: string;
}

export interface IAuthResponse extends IRegister {}

export interface IRegister extends IAuth {
  //passwordRepeat: string;
  email: string;
}

export interface IRegisterResponse {
  status: string;
}

export interface IUser {
  login: string;
}
