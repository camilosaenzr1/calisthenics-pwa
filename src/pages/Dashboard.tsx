import { useUser } from '../store/UserContext'
import { Play } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { currentUser } = useUser()

  if (!currentUser) return null

  return (
    <div className="p-6 space-y-8">
      <header className="pt-8">
        <p className="text-text-muted font-medium mb-1">DOMINGO 21 SEP</p>
        <h1 className="title-large text-white">Hola, {currentUser.name}</h1>
      </header>

      {/* Hero Action Card */}
      <Link to="/workout" className="block relative w-full h-80 rounded-[32px] overflow-hidden group">
        <img 
          src="/exercises/incline_pushup.jpg" 
          alt="Workout" 
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end">
          <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full w-max mb-3 uppercase tracking-widest">
            Nivel 1
          </span>
          <h2 className="text-3xl font-bold text-white leading-tight mb-4">Cuerpo<br/>Completo</h2>
          
          <div className="w-full bg-white text-black py-4 rounded-full font-bold flex justify-center items-center gap-2">
            <Play fill="currentColor" size={20} />
            Empezar Rutina
          </div>
        </div>
      </Link>

      <div className="flex gap-4">
        <div className="glass-panel p-5 flex-1">
          <div className="text-text-muted text-sm font-medium mb-1">Racha</div>
          <div className="text-2xl font-bold">3 Días</div>
        </div>
        <div className="glass-panel p-5 flex-1">
          <div className="text-text-muted text-sm font-medium mb-1">Calorías</div>
          <div className="text-2xl font-bold">450 <span className="text-sm font-normal text-text-muted">/ 1900</span></div>
        </div>
      </div>
    </div>
  )
}
