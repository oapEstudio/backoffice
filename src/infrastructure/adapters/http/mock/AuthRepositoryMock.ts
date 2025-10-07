import type { AuthClaims, IAuthRepository } from "../../../../application/interfaces/IAuthRepository";

const mockUser: AuthClaims = {
  name: 'Dev User',
  email: 'dev@example.com',
  preferred_username: 'devuser',
};

export class AuthRepositoryMock implements IAuthRepository {
  async getClaims(): Promise<AuthClaims | undefined> {
    return mockUser;
  }
  login(): void {
  }
  logout(): void {
    window.location.assign('/');
  }
}
