import React, { useState, useEffect } from 'react'
import { db, Exercise } from '../db/db'
import { Timer, CheckCircle, Info } from 'lucide-react'

export default function WorkoutPlayer() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    // Cargar solo los nivel 1 y 2
    db.exercises.toArray().then(data => setExercises(data))
  }, [])

  useEffect(() => {
    let interval: any = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, timeLeft])

  if (exercises.length === 0) return <div className="p-4">Cargando rutina...</div>

  const currentEx = exercises[currentIndex]

  const startRest = () => {
    setTimeLeft(90) // 90 segundos de descanso por defecto
    setIsActive(true)
  }

  const nextExercise = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setTimeLeft(0)
      setIsActive(false)
    }
  }

  return (
    <div className="flex flex-col h-full min-h-[100vh] bg-background">
      <div className="glass-panel rounded-b-[2.5rem] p-6 pt-10 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider glow-border">
            {currentEx.pattern}
          </span>
          <span className="text-sm font-medium text-neutral-400">
            Nivel {currentEx.level}
          </span>
        </div>
        
        <h1 className="text-3xl font-bold text-white leading-tight mb-4">{currentEx.name}</h1>
        
        {/* Dynamic Image from AI generation */}
        {currentEx.media_url ? (
          <div className="w-full h-56 rounded-2xl my-6 overflow-hidden border border-neutral-800 relative glow-border">
            <img 
              src={currentEx.media_url} 
              alt={currentEx.name} 
              className="w-full h-full object-cover"
            />
            {/* Soft gradient overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-surface to-transparent opacity-80" />
          </div>
        ) : (
          <div className="w-full h-48 bg-surface rounded-2xl my-6 flex items-center justify-center border border-neutral-800">
            <Info className="text-neutral-500 mr-2" />
            <span className="text-neutral-500">Animación del ejercicio</span>
          </div>
        )}

        <p className="text-neutral-300 text-sm leading-relaxed mb-2">{currentEx.description}</p>
        <div className="inline-flex items-center mt-2 px-3 py-1.5 bg-neutral-900 rounded-lg border border-neutral-800">
          <span className="text-xs font-semibold text-primary glow-text">Meta: {currentEx.next_level_criteria}</span>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col justify-end gap-4 pb-24">
        {/* Timer Section */}
        {isActive ? (
          <div className="glass-panel rounded-3xl p-8 flex flex-col items-center">
            <span className="text-primary font-medium text-sm mb-2 glow-text">Descanso Activo</span>
            <span className="text-6xl font-mono font-bold text-white glow-text">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
        ) : (
          <button 
            onClick={startRest}
            className="w-full py-4 rounded-2xl bg-surface hover:bg-neutral-800 text-white font-bold flex justify-center items-center gap-2 border border-neutral-700 transition-colors"
          >
            <Timer size={22} className="text-primary" />
            Iniciar Descanso (90s)
          </button>
        )}

        <button 
          onClick={nextExercise}
          className="w-full py-4 rounded-2xl bg-primary hover:bg-emerald-400 text-black font-extrabold flex justify-center items-center gap-2 glow-border transition-all transform active:scale-95"
        >
          <CheckCircle size={22} />
          {currentIndex === exercises.length - 1 ? 'Finalizar Rutina' : 'Completado - Siguiente'}
        </button>
      </div>
    </div>
  )
}
