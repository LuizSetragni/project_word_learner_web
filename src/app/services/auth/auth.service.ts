import { Injectable } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
constructor(){}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? this.isTokenValid(token) : false;
  }

  private isTokenValid(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp === undefined) {
        return false;
      }
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
  }
}
