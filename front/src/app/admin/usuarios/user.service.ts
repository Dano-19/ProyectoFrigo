import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: any = null;

  setUser(data: any): void {
    this.userData = data;
  }

  getUser(): any {
    return this.userData;
  }

  clearUser(): void {
    this.userData = null;
  }
}