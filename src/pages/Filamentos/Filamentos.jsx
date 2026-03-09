import React from 'react';
import { Title } from 'react-head';
import { Link } from 'react-router';

const Filamentos = () => {
  const filaments = [
    {
      id: 'pla',
      name: 'PLA',
      image: 'https://via.placeholder.com/600x400?text=PLA+Filament'
    },
    {
      id: 'abs',
      name: 'ABS',
      image: 'https://via.placeholder.com/600x400?text=ABS+Filament'
    },
    {
      id: 'petg',
      name: 'PETG',
      image: 'https://via.placeholder.com/600x400?text=PETG+Filament'
    },
    {
      id: 'flex',
      name: 'TPU/Flex',
      image: 'https://via.placeholder.com/600x400?text=TPU+Filament'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Title>3Dtech - Filamentos 3D</Title>
      <header className="bg-white border-b border-gray-200 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">Filamentos 3D</h1>
          <p className="text-xl text-gray-600 mb-6">
            Conheça as opções de materiais que trabalhamos para suas impressões 3D.
          </p>
        </div>
      </header>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filaments.map(f => (
            <div key={f.id} className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img
                src={f.image}
                alt={f.name}
                className="w-full h-40 object-cover"
              />
              <div className="text-center mt-2">
                <span className="text-gray-700 font-semibold">{f.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Filamentos;
