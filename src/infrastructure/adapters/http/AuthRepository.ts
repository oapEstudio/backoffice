import type { AuthClaims, IAuthRepository } from "../../../application/interfaces/IAuthRepository";

const resolveLandingPage = (landingPage?: string): string | undefined => {

  const candidate = landingPage ?? `${window.location.pathname}${window.location.search}`;

  if (!candidate) return undefined;

  try {
    const url = new URL(candidate, window.location.origin);
    if (url.origin !== window.location.origin) return undefined;
    const relative = `${url.pathname}${url.search}${url.hash}`;
    return relative || '/';
  } catch {
    return candidate.startsWith('/') ? candidate : undefined;
  }
};

export class AuthRepositoryHttp implements IAuthRepository {

  async getClaims(): Promise<AuthClaims | undefined> {
    try {
      const resp = await fetch('/.auth/me', { credentials: 'include' });
      if (!resp.ok) return undefined;
      const payload = (await resp.json()) as AuthClaims;
      return payload;
    } catch {
      return undefined;
    }
  }

  login(landingPage?: string): void {

    const loginUrl = new URL('/.auth/login', window.location.origin);
    const landing = resolveLandingPage(landingPage);

    if (landing) loginUrl.searchParams.set('landingpage', landing);
    
    window.location.assign(loginUrl.toString());
  }

  logout(): void {
    window.location.assign('/.auth/end-session');
  }
}
