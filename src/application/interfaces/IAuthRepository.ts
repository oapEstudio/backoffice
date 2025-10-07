export interface AuthClaims {
  name?: string;
  nickname?: string;
  preferred_username?: string;
  email?: string;
  [claim: string]: unknown;
}

export interface IAuthRepository {

  getClaims(): Promise<AuthClaims | undefined>;
  login(landingPage?: string): void;
  logout(): void;
  
}
