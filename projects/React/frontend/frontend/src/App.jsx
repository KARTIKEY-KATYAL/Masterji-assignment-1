import React from 'react'
import Login from "./components/login"
import SignUp from './components/signup';
import { useNavigate } from 'react-router'

function App() {
  const navigate = useNavigate();

  const handleNavigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className='h-screen flex items-center justify-center flex-col gap-4 bg-black text-white'>
      <h1 className='text-5xl text-orange-500 font-bold '>Hello</h1>
      <button onClick={handleNavigateToSignup} className='bg-blue-700 font-bold text-amber-50 text-2xl px-4 py-1 border-amber-700 rounded-lg cursor-pointer'>Start</button>
    </div>
  );
}

export default App
