import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
 const [jokes,setjokes] = useState([])
 return(
  <>
  <h1>Jokes {jokes.length}</h1>
  {jokes.map((joke,index)=>{
    <div key={joke.id}>
      <h1>{joke}</h1>
      <p>{joke.desc}</p>
    </div>
  })}
  </>
 )
}

export default App
