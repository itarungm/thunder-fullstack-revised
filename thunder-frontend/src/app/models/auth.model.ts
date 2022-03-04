import { CommonResponseModel } from "./response.model";
import { LocalStorageService } from "../services/local-storage.service";
import { Injector } from "@angular/core";

const injector = Injector.create({
  providers: [
      { provide: LocalStorageService, deps: [] }
  ]
});


export class User {
  username: string;
  name: string;
  email: string;
  password: string;
  verificationUrl?: string;
}

export class RegistrationResponseModel extends CommonResponseModel {
  response: {
    username: string;
    name: string;
    email: string;
  };
}

export class LoginResponseModel extends CommonResponseModel {
  response: {
    name: string;
  };
  token: string
}

export class UserDetails {
  isActive: boolean
  isEmailVerified: boolean
  maxFileUploadCount: number
  username: string
}

export class ForgotPassword{
  email: string
  verificationUrl?: string
}

export class ChangePassword{
  token: string
  password: string
}