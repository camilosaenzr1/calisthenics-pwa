import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Home, Dumbbell, Utensils, User as UserIcon } from 'lucide-react'
import { UserProvider } from './store/UserContext'

import Dashboard from './pages/Dashboard'
import WorkoutPlayer from './pages/WorkoutPlayer'
import Nutrition from './pages/Nutrition'
import Profile from './pages/Profile'

const BottomNav = () => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Inicio', icon: <Home size={24} /> },
    { path: '/workout', label: 'Entrenar', icon: <Dumbbell size={24} /> },
    { path: '/nutrition', label: 'Dieta', icon: <Utensils size={24} /> },
    { path: '/profile', label: 'Perfil', icon: <UserIcon size={24} /> },
  ]

  return (
    <nav className="fixed bottom-0 w-full bg-surface border-t border-neutral-800 flex justify-around p-3 pb-safe z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path
        return (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`flex flex-col items-center p-2 rounded-xl transition-colors ${isActive ? 'text-primary' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            {item.icon}
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="flex flex-col min-h-screen pb-20 bg-background text-text">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workout" element={<WorkoutPlayer />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <BottomNav />
        </div>
      </Router>
    </UserProvider>
  )
}

export default App
