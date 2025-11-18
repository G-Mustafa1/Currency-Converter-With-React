import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ConverterForm from './components/ConverterForm'

function App() {
  return (    
    <div className="min-h-screen text-gray-50 flex justify-center items-center py-5 sm:px-4"
    >
      <div className="border border-white/20 bg-white/10 backdrop-blur-xl p-7 rounded-2xl shadow-2xl w-full max-w-md 
                  transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]">

        <h1 className="text-3xl font-extrabold text-center mb-6 tracking-wide">
          Currency Converter
        </h1>
        <ConverterForm />
      </div>
    </div>


  )
}

export default App
