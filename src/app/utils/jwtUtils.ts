import { JwtHelperService } from '@auth0/angular-jwt';

export class JwtUtils {
  static globalUserId: number | null = null;
  static globalName: string | null = null;
  static globalEmail: string | null = null;
  static isLogado: boolean = false;

  static decodeJwt(token: string): void {
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(token);
    
    this.globalUserId = decodedToken.user_id;
    this.globalName = decodedToken.name;
    this.globalEmail = decodedToken.email;
    this.isLogado = true;

    console.log("JWT decodificado com sucesso.");
  }
}
