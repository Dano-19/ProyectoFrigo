import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth'; // ✅ Cambia si tu backend está en otro host

  constructor(private http: HttpClient) {}
  usersData: any;

  // ✅ Método para login
  loginConNest(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res) => {
        console.log(res);
        this.usersData = res.data;
      })
    );
  }
  getuserData(){
    return this.usersData
  }

  // ✅ Método para enviar contraseña por correo
  enviarPasswordPorCorreo(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/recuperar`, { email });
  }
}

