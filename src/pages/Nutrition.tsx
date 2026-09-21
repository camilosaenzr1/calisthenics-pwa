import React, { useState } from 'react'
import { Plus, Droplets, Check } from 'lucide-react'
import { useUser } from '../store/UserContext'

export default function Nutrition() {
  const { currentUser } = useUser()
  const [water, setWater] = useState(0)

  // Meta harcodeada o calculada por defecto para mock
  const metaCalorias = currentUser?.goal === 'perder_grasa' ? 1900 : 2200

  const meals = [
    { name: 'Desayuno', items: 'Huevos, Avena, Café', cals: 450, done: true },
    { name: 'Almuerzo', items: 'Pollo asado, Arroz, Ensalada', cals: 750, done: false },
    { name: 'Cena', items: 'Atún, Tostadas integrales', cals: 400, done: false },
    { name: 'Snack', items: 'Proteína Whey, Almendras', cals: 300, done: false },
  ]

  const consumedCals = meals.filter(m => m.done).reduce((acc, curr) => acc + curr.cals, 0)
  const remainingCals = metaCalorias - consumedCals

  return (
    <div className="p-4 space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-white mb-1">Plan Nutricional</h1>
        <p className="text-neutral-400 text-sm">Objetivo: {currentUser?.goal.replace('_', ' ')}</p>
      </header>

      {/* Calories Ring / Bar */}
      <div className="bg-surface rounded-3xl p-6 shadow-lg border border-neutral-800">
        <div className="flex justify-between mb-2">
          <span className="text-neutral-400 font-medium">Consumido</span>
          <span className="text-white font-bold">{consumedCals} kcal</span>
        </div>
        
        <div className="w-full bg-neutral-800 rounded-full h-3 mb-4">
          <div 
            className="bg-primary h-3 rounded-full transition-all duration-500" 
            style={{ width: `${Math.min((consumedCals / metaCalorias) * 100, 100)}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center text-sm">
          <div className="text-neutral-400">Restante: <span className="text-white font-bold">{remainingCals}</span> kcal</div>
          <div className="text-neutral-400">Meta: <span className="text-white font-bold">{metaCalorias}</span> kcal</div>
        </div>
      </div>

      {/* Water Tracker */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/20 p-2 rounded-xl text-blue-400">
            <Droplets size={24} />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Agua (Vasos)</h3>
            <p className="text-xs text-blue-400">{water} de 8 completados</p>
          </div>
        </div>
        <button 
          onClick={() => setWater(w => Math.min(w + 1, 8))}
          className="bg-blue-500 hover:bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-lg shadow-blue-500/20"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Fixed Meals */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Comidas de Hoy</h2>
        <div className="space-y-3">
          {meals.map((meal, idx) => (
            <div key={idx} className={`p-4 rounded-2xl border transition-colors flex justify-between items-center ${meal.done ? 'bg-surface border-green-500/30 opacity-70' : 'bg-surface border-neutral-700'}`}>
              <div>
                <h3 className={`font-bold text-sm ${meal.done ? 'text-green-400' : 'text-white'}`}>{meal.name}</h3>
                <p className="text-xs text-neutral-400 mt-1">{meal.items}</p>
                <span className="inline-block mt-2 text-xs font-medium bg-neutral-800 px-2 py-1 rounded text-neutral-300">
                  {meal.cals} kcal
                </span>
              </div>
              <button className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${meal.done ? 'bg-green-500 border-green-500 text-white' : 'border-neutral-600 text-transparent'}`}>
                <Check size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
