import React from 'react'
import { useUser } from '../store/UserContext'
import { Play, Flame, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { currentUser } = useUser()

  if (!currentUser) return <div className="p-4">Cargando...</div>

  return (
    <div className="p-4 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Hola, {currentUser.name}</h1>
          <p className="text-neutral-400">Listo para entrenar?</p>
        </div>
        <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center text-primary font-bold">
          {currentUser.name.charAt(0)}
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface p-4 rounded-2xl flex flex-col items-center justify-center">
          <Flame className="text-orange-500 mb-2" size={28} />
          <span className="text-2xl font-bold">3 Días</span>
          <span className="text-xs text-neutral-400">Racha actual</span>
        </div>
        <div className="bg-surface p-4 rounded-2xl flex flex-col items-center justify-center">
          <Calendar className="text-primary mb-2" size={28} />
          <span className="text-2xl font-bold">12</span>
          <span className="text-xs text-neutral-400">Entrenos mes</span>
        </div>
      </div>

      {/* Quick Action */}
      <div className="bg-primary/10 border border-primary/20 p-5 rounded-2xl mt-6">
        <h2 className="text-lg font-bold text-primary mb-1">Entrenamiento de Hoy</h2>
        <p className="text-sm text-neutral-300 mb-4">Fase 1: Movilidad y Fuerza Base</p>
        
        <Link to="/workout" className="w-full bg-primary text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-blue-600 transition-colors">
          <Play fill="currentColor" size={20} />
          Comenzar
        </Link>
      </div>

      {/* Nutrition Summary Preview */}
      <div className="bg-surface p-5 rounded-2xl">
        <h2 className="font-bold text-white mb-3">Resumen Nutricional</h2>
        <div className="w-full bg-neutral-800 rounded-full h-2 mb-2">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
        </div>
        <div className="flex justify-between text-xs text-neutral-400">
          <span>Consumido: 950 kcal</span>
          <span>Meta: 2100 kcal</span>
        </div>
      </div>
    </div>
  )
}
