'use client'; 

import { useContext, useState, FormEvent } from 'react';
import Image from 'next/image';
import { AuthContext } from '@/contexts/AuthContext';

export default function Home() {
  const { signIn } = useContext(AuthContext); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault(); 
    
    if(!email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    setLoading(true);
    await signIn({ email, password });
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        
        <div className="text-center">
          {/* Você pode colocar sua logo aqui depois */}
          <h1 className="text-3xl font-bold text-yellow-500">BarberPro</h1>
          <p className="mt-2 text-gray-400">Faça login para agendar</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Digite seu email"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">Senha</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Sua senha secreta"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full p-3 font-bold text-gray-900 bg-yellow-500 rounded hover:bg-yellow-400 transition-colors disabled:opacity-50"
          >
            {loading ? 'Carregando...' : 'Acessar'}
          </button>
        </form>

        <div className="text-center">
          <a href="#" className="text-sm text-gray-400 hover:text-white">
            Não tem conta? Cadastre-se
          </a>
        </div>

      </div>
    </div>
  );
}