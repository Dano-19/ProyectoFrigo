import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth'; // Ajusta si tu backend cambia

  constructor(private http: HttpClient) {}

  usersData: any;

  // ✅ Login
  loginConNest(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res) => {
        console.log(res);
        this.usersData = res.data;
      })
    );
  }

  // ✅ Obtener usuario actual (opcional)
  getuserData() {
    return this.usersData;
  }

  // ✅ Enviar correo con enlace para cambiar contraseña
  enviarPasswordPorCorreo(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/recuperar`, { email });
  }

  // ✅ Alias para integrarse mejor con el componente forgot-password
  forgotPassword(email: string): Observable<any> {
    return this.enviarPasswordPorCorreo(email);
  }

  // ✅ Cambiar contraseña usando token desde URL
  changePassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, { token, newPassword });
  }

  // ❌ Obsoleto (dejó de usarse con el flujo actual)
  // restablecerPassword(email: string, code: string, newPassword: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/reset-password`, { email, code, newPassword });
  // }
}
