import { useState, useEffect } from 'react'
import { db, type Exercise } from '../db/db'
import { Check } from 'lucide-react'

export default function WorkoutPlayer() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentSet, setCurrentSet] = useState(1)
  const totalSets = 3 // Hardcoded to 3 sets as per plan
  
  const [timeLeft, setTimeLeft] = useState(0)
  const [isResting, setIsResting] = useState(false)

  useEffect(() => {
    db.exercises.toArray().then(data => setExercises(data))
  }, [])

  useEffect(() => {
    let interval: any = null
    if (isResting && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000)
    } else if (timeLeft === 0 && isResting) {
      setIsResting(false)
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isResting, timeLeft])

  if (exercises.length === 0) return null

  const currentEx = exercises[currentIndex]

  const handleCompleteSet = () => {
    if (currentSet < totalSets) {
      setCurrentSet(currentSet + 1)
      setTimeLeft(90) // 90s rest
      setIsResting(true)
    } else {
      // Move to next exercise
      if (currentIndex < exercises.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setCurrentSet(1)
        setTimeLeft(120) // longer rest between exercises
        setIsResting(true)
      } else {
        alert("¡Entrenamiento Completado!")
      }
    }
  }

  const skipRest = () => {
    setTimeLeft(0)
    setIsResting(false)
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Full screen image header */}
      <div className="relative h-[55vh] w-full">
        {currentEx.media_url ? (
          <img src={currentEx.media_url} alt={currentEx.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-surface" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Top bar info */}
        <div className="absolute top-12 left-6 right-6 flex justify-between">
          <span className="glass-panel px-4 py-1.5 text-xs font-bold tracking-widest uppercase">
            Ejercicio {currentIndex + 1} de {exercises.length}
          </span>
          <span className="glass-panel px-4 py-1.5 text-xs font-bold text-primary">
            Serie {currentSet} / {totalSets}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-24 -mt-10 relative z-10 flex flex-col">
        <h1 className="title-large text-white mb-2">{currentEx.name}</h1>
        <p className="text-text-muted text-lg">{currentEx.description}</p>
        
        <div className="mt-8 flex justify-between items-center glass-panel p-6">
          <div>
            <div className="text-sm text-text-muted mb-1">Objetivo</div>
            <div className="text-3xl font-bold text-white">{currentEx.next_level_criteria}</div>
          </div>
          <div className="h-12 w-px bg-neutral-800" />
          <div className="text-right">
            <div className="text-sm text-text-muted mb-1">Descanso</div>
            <div className="text-3xl font-bold text-white">90s</div>
          </div>
        </div>

        {/* Floating Action Button area */}
        <div className="mt-auto pt-6">
          {isResting ? (
            <div className="flex flex-col items-center">
              <div className="text-7xl font-bold text-white mb-6 tabular-nums">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </div>
              <button onClick={skipRest} className="text-text-muted font-medium py-3 px-8 rounded-full border border-neutral-700">
                Saltar Descanso
              </button>
            </div>
          ) : (
            <button 
              onClick={handleCompleteSet}
              className="w-full bg-white text-black text-xl font-bold py-5 rounded-[24px] flex justify-center items-center gap-3 transition-transform active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              <Check size={28} />
              Completar Serie {currentSet}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
