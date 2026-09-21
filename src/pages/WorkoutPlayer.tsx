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
    <div className="flex flex-col h-full min-h-[80vh]">
      <div className="bg-surface rounded-b-3xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {currentEx.pattern}
          </span>
          <span className="text-sm font-medium text-neutral-400">
            Nivel {currentEx.level}
          </span>
        </div>
        
        <h1 className="text-3xl font-bold text-white leading-tight mb-2">{currentEx.name}</h1>
        
        {/* Placeholder para GIF Lottie u Offline Image */}
        <div className="w-full h-48 bg-neutral-800 rounded-xl my-6 flex items-center justify-center border border-neutral-700">
          <Info className="text-neutral-500 mr-2" />
          <span className="text-neutral-500">Animación del ejercicio</span>
        </div>

        <p className="text-neutral-300 text-sm leading-relaxed">{currentEx.description}</p>
        <p className="mt-3 text-xs font-semibold text-green-400">Objetivo para avanzar: {currentEx.next_level_criteria}</p>
      </div>

      <div className="flex-1 p-6 flex flex-col justify-end gap-4">
        {/* Timer Section */}
        {isActive ? (
          <div className="bg-surface rounded-2xl p-6 flex flex-col items-center">
            <span className="text-neutral-400 text-sm mb-2">Descanso Activo</span>
            <span className="text-5xl font-mono font-bold text-white">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
        ) : (
          <button 
            onClick={startRest}
            className="w-full py-4 rounded-xl bg-neutral-800 text-white font-bold flex justify-center items-center gap-2 border border-neutral-700"
          >
            <Timer size={20} />
            Iniciar Descanso (90s)
          </button>
        )}

        <button 
          onClick={nextExercise}
          className="w-full py-4 rounded-xl bg-primary text-white font-bold flex justify-center items-center gap-2 shadow-lg shadow-primary/30"
        >
          <CheckCircle size={20} />
          Completado - Siguiente
        </button>
      </div>
    </div>
  )
}
