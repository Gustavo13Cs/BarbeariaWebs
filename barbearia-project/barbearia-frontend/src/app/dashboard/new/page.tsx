'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import Link from 'next/link';

interface ServiceProps {
  id: string;
  name: string;
  price: number;
}

export default function NewBooking() {
  const router = useRouter();
  
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [selectedService, setSelectedService] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadServices() {
      try {
        const response = await api.get('/services');
        setServices(response.data);
      } catch (err) {
        console.log("Erro ao carregar serviços", err);
      }
    }
    loadServices();
  }, []);

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if(!selectedService || !date) {
      alert("Selecione um serviço e um horário");
      return;
    }

    try {
      setLoading(true);
      
      const dateFormatted = new Date(date).toISOString();

      await api.post('/bookings', {
        service_id: selectedService,
        date: dateFormatted
      });

      alert("Agendamento realizado com sucesso!");
      router.push('/dashboard'); 

    } catch (err) {
      console.log(err);
      alert("Erro ao agendar. Verifique se o horário já não está ocupado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      
      <div className="w-full max-w-md bg-card border border-border rounded-lg shadow-lg p-8">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Novo Agendamento</h1>
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition">
            Voltar
          </Link>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Escolha o Serviço
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled>Selecione...</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name} - R$ {Number(service.price).toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Data e Horário
            </label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
          >
            {loading ? 'Agendando...' : 'Confirmar Agendamento'}
          </button>

        </form>
      </div>
    </div>
  );
}