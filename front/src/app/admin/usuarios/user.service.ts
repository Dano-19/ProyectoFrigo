import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

interface TokenPayload {
  role: string;
  // aquí puedes agregar más campos si tu token los incluye
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: any = null;

  setUser(data: any): void {
    console.log('🔍 Usuario guardado en UserService:', data); 
    this.userData = data;
  }

  getUser(): TokenPayload | null {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return null;
    }
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const user = {...decoded,role: this.userData.rol};
      return user;
    } catch (e) {
      console.error('Error decodificando token:', e);
      return null;
    }
  }

  clearUser(): void {
    this.userData = null;
  }
}