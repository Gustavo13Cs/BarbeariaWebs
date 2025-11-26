'use client';

import { useState, useEffect, FormEvent, useContext } from 'react';
import { api } from '@/services/api';
import Link from 'next/link';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface ServiceProps {
  id: string;
  name: string;
  price: string | number;
  durationInMinutes: number;
}

export default function Services() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [services, setServices] = useState<ServiceProps[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  
  async function loadServices() {
    const response = await api.get('/services');
    setServices(response.data);
  }

  useEffect(() => {
    loadServices();
  }, []);

  // Cadastra novo serviço
  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if(name === '' || price === '' || duration === ''){
      alert("Preencha todos os campos");
      return;
    }

    try {
      await api.post('/services', {
        name: name,
        price: Number(price),
        duration: Number(duration)
      });

      setName('');
      setPrice('');
      setDuration('');
      
      alert("Serviço cadastrado com sucesso!");
      loadServices(); 

    } catch(err) {
      console.log(err);
      alert("Erro ao cadastrar.");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-4xl mx-auto mt-8">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Gerenciar Serviços</h1>
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition">
            Voltar
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Lado Esquerdo: Formulário */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-lg h-fit">
            <h2 className="text-xl font-semibold mb-4">Cadastrar Novo</h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">Nome do Serviço</label>
                <input 
                  type="text" 
                  placeholder="Ex: Corte Degrade"
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:ring-2 focus:ring-ring outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Preço (R$)</label>
                  <input 
                    type="number" 
                    placeholder="45.00"
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:ring-2 focus:ring-ring outline-none"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Duração (min)</label>
                  <input 
                    type="number" 
                    placeholder="30"
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:ring-2 focus:ring-ring outline-none"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
              </div>

              <button className="w-full h-10 bg-green-600 hover:bg-green-500 text-white font-bold rounded transition">
                Cadastrar
              </button>
            </form>
          </div>

          {/* Lado Direito: Lista */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Serviços Ativos</h2>
            
            {services.map(service => (
              <div key={service.id} className="bg-card border border-border p-4 rounded-lg flex justify-between items-center shadow-sm hover:bg-accent transition">
                <div>
                  <strong className="block text-lg">{service.name}</strong>
                  <span className="text-muted-foreground text-sm">{service.durationInMinutes} min</span>
                </div>
                <div className="text-primary font-bold text-lg">
                  R$ {Number(service.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}