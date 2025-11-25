'use client';

import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { api } from '@/services/api';

interface ServiceProps {
  id: string;
  name: string;
  price: string | number;
}

interface BookingProps {
  id: string;
  startTime: string;
  status: string;
  service: ServiceProps; 
}

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState<BookingProps[]>([]);
  useEffect(() => {
    async function loadBookings() {
      try {
        const response = await api.get('/bookings');
        setBookings(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    loadBookings();
  }, []);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 shadow-md border-b border-gray-700">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-yellow-500">BarberPro</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-400">Olá,</div>
              <div className="font-bold">{user?.name}</div>
            </div>
            {/* Futuro botão de Sair */}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto mt-8 p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Meus Agendamentos</h2>
          <button className="px-4 py-2 bg-yellow-500 text-gray-900 font-bold rounded hover:bg-yellow-400 transition transform hover:scale-105">
            + Novo Agendamento
          </button>
        </div>
        
        {/* 3. Renderização Condicional */}
        {bookings.length === 0 ? (
          <div className="text-center text-gray-500 mt-10 p-8 bg-gray-800 rounded-lg">
            <p>Nenhum agendamento encontrado.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {/* O famoso .map para criar a lista */}
            {bookings.map(booking => (
              <div key={booking.id} className="bg-gray-800 p-5 rounded-lg border-l-4 border-yellow-500 shadow-lg hover:bg-gray-750 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{booking.service.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {formatDate(booking.startTime)}
                    </p>
                  </div>
                  <span className="bg-gray-700 text-yellow-500 px-3 py-1 rounded text-xs font-bold">
                    R$ {Number(booking.service.price).toFixed(2)}
                  </span>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span className={`text-xs px-2 py-1 rounded ${
                    booking.status === 'SCHEDULED' ? 'bg-green-900 text-green-200' : 'bg-gray-700 text-gray-300'
                  }`}>
                    {booking.status === 'SCHEDULED' ? 'Confirmado' : booking.status}
                  </span>
                  
                  {}
                  <button className="text-red-400 text-sm hover:text-red-300">
                    Cancelar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}