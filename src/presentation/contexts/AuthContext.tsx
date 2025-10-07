import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { AuthClaims, IAuthRepository } from '../../application/interfaces/IAuthRepository';

type AuthMode = 'enabled' | 'mock' | 'disabled';

interface AuthContextValue {
  user?: AuthClaims;
  isAuthenticated: boolean;
  loading: boolean;
  mode: AuthMode;

  getUserName(): string | undefined;
  login(landingPage?: string): void;
  logout(): void;
  refresh(): Promise<void>;
  ensureAuthenticated(opts?: { landingPage?: string; forceRefresh?: boolean }): Promise<boolean>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const extractDisplayName = (claims?: AuthClaims) =>
  (claims?.name ?? claims?.nickname ?? claims?.preferred_username ?? claims?.email) || undefined;

interface AuthProviderProps {
  children: React.ReactNode;
  repo: IAuthRepository; 
  mode: AuthMode;        
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, repo, mode }) => {
 
  const [user, setUser] = useState<AuthClaims | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const claimsReqRef = useRef<Promise<AuthClaims | undefined> | undefined>(undefined);

  const getClaims = useCallback(async (forceRefresh = false) => {

    if (mode === 'mock') return user ?? (await repo.getClaims());
    if (mode === 'disabled') return undefined;

    if (!forceRefresh) {
      if (user) return user;
      if (claimsReqRef.current) return claimsReqRef.current;
    }

    const req = repo.getClaims()
      .then((claims) => { setUser(claims); return claims; })
      .finally(() => { claimsReqRef.current = undefined; });

    claimsReqRef.current = req;

    return req;

  }, [repo, user, mode]);

  const login = useCallback((landingPage?: string) => {

    if (mode === 'enabled') repo.login(landingPage);

  }, [repo, mode]);

  const logout = useCallback(() => {

    setUser(undefined);

    repo.logout();

  }, [repo]);

  const refresh = useCallback(async () => {

    if (mode === 'mock') { setUser(await repo.getClaims()); return; }
    if (mode === 'disabled') { setUser(undefined); return; }

    await getClaims(true);

  }, [getClaims, repo, mode]);

  const ensureAuthenticated = useCallback(async (opts?: { landingPage?: string; forceRefresh?: boolean }) => {
    
    if (mode === 'mock' || mode === 'disabled') return true; 

    const claims = await getClaims(!!opts?.forceRefresh);

    if (claims) return true;

    login(opts?.landingPage);

    return false;
    
  }, [getClaims, login, mode]);

  useEffect(() => {
    (async () => {
      if (mode === 'mock') {
        setUser(await repo.getClaims());
        setLoading(false);
        return;
      }
      if (mode === 'disabled') {
        setUser(undefined);
        setLoading(false);
        return;
      }
      await getClaims(false);
      setLoading(false);
    })();
  }, [repo, mode, getClaims]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated: mode === 'enabled' ? !!user : true, 
    loading,
    mode,
    getUserName: () => extractDisplayName(user),
    login,
    logout,
    refresh,
    ensureAuthenticated,
  }), [user, loading, mode, login, logout, refresh, ensureAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {

  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  
  return ctx;
};
