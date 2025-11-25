'use client'; 

import { createContext, ReactNode, useState } from 'react';
import { setCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/navigation'; 
import { api } from '../services/api';

interface UserProps {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface AuthContextData {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: SignInData) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter(); 
  const [user, setUser] = useState<UserProps>();

  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInData) {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });

      const { token, id, name, role } = response.data;

      setCookie(undefined, 'barbearia.token', token, {
        maxAge: 60 * 60 * 24 * 30, 
        path: '/'
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      setUser({
        id,
        name,
        email,
        role: role || 'CLIENT'
      });

      console.log("Logado com sucesso!");
      router.push('/dashboard');
      

    } catch (err) {
      console.log("Erro ao logar", err);
      alert("Erro ao logar. Verifique o console.");
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}