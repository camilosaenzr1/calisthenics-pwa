import React, { useState } from 'react'
import { useUser } from '../store/UserContext'
import { db, User } from '../db/db'
import { LogOut, Settings, UserPlus } from 'lucide-react'

export default function Profile() {
  const { currentUser, setCurrentUser, users } = useUser()
  const [showSwitch, setShowSwitch] = useState(false)

  if (!currentUser) return <div className="p-4">Cargando...</div>

  // Calcular IMC simple
  const imc = (currentUser.weight / Math.pow(currentUser.height / 100, 2)).toFixed(1)

  return (
    <div className="p-4 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Perfil</h1>
        <button className="text-neutral-400 p-2"><Settings size={24} /></button>
      </header>

      {/* Tarjeta Usuario */}
      <div className="bg-surface rounded-3xl p-6 border border-neutral-800 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-primary/30">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{currentUser.name}</h2>
            <p className="text-sm text-neutral-400 capitalize">{currentUser.goal.replace('_', ' ')}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 border-t border-neutral-800 pt-4">
          <div className="text-center">
            <div className="text-xs text-neutral-500 mb-1">Peso</div>
            <div className="font-bold text-white">{currentUser.weight} kg</div>
          </div>
          <div className="text-center border-l border-r border-neutral-800">
            <div className="text-xs text-neutral-500 mb-1">Altura</div>
            <div className="font-bold text-white">{currentUser.height} cm</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-neutral-500 mb-1">IMC</div>
            <div className="font-bold text-white">{imc}</div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setShowSwitch(!showSwitch)}
        className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-3 rounded-xl transition-colors border border-neutral-700"
      >
        Cambiar Perfil
      </button>

      {showSwitch && (
        <div className="bg-surface p-4 rounded-2xl border border-neutral-800 space-y-3">
          <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-2">Seleccionar Usuario</h3>
          {users.map(u => (
            <div 
              key={u.id}
              onClick={() => {
                setCurrentUser(u)
                setShowSwitch(false)
              }}
              className={`p-3 rounded-xl flex items-center justify-between cursor-pointer border ${currentUser.id === u.id ? 'border-primary bg-primary/10' : 'border-neutral-700 hover:bg-neutral-800'}`}
            >
              <div className="font-medium text-white">{u.name}</div>
              {currentUser.id === u.id && <div className="w-2 h-2 rounded-full bg-primary"></div>}
            </div>
          ))}
          <button className="w-full mt-2 text-sm text-primary flex items-center justify-center gap-2 py-2">
            <UserPlus size={16} />
            Crear nuevo perfil
          </button>
        </div>
      )}

      {/* App Info */}
      <div className="mt-12 text-center text-xs text-neutral-600">
        <p>CaliNutri PWA v1.0.0</p>
        <p>Offline First Architecture</p>
      </div>
    </div>
  )
}
