import { DataResponseModel } from './../../models/abstract/dataResponseModel';
import { CapacitorStorageService } from './../storage/capacitor-storage.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ResponseModel } from 'src/app/models/abstract/responseModel';
import { CommonHttpService } from '../http/common-http.service';
import { LoginCredentials } from 'src/app/models/concrete/auth/loginCredentials';
import { RegisterCredentials } from 'src/app/models/concrete/auth/registerCredentials';
import { LoginResponseModel } from 'src/app/models/concrete/auth/loginResponseModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpService: CommonHttpService, private capacitorStorage: CapacitorStorageService) {}

  login(loginCredentials: LoginCredentials): Observable<DataResponseModel<LoginResponseModel>> {
    return this.httpService.post<DataResponseModel<LoginResponseModel>>('auth/login', loginCredentials);
  }

  register(registerCredentials: RegisterCredentials) {
    return this.httpService.post<ResponseModel>('auth/register', registerCredentials);
  }

  async logout() {
    await this.capacitorStorage.removeElement('token');
  }

  async isLoggedIn(): Promise<boolean> {
    let token = await this.capacitorStorage.getElement<string>('token');
    return token ? true : false;
  }
  async setToken(token: string) {
    await this.capacitorStorage.storeElement('token', token);
  }
  async getToken(): Promise<string> {
    let token = await this.capacitorStorage.getElement<string>('token');
    return token;
  }
}
