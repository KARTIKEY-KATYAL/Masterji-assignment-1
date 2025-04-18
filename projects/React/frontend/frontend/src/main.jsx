import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from "./components/login";
import { BrowserRouter , Routes ,Route } from "react-router";
import SignUp from './components/signup.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<App/>}/>
        <Route path =  '/login' element = {<Login/>}/>
        <Route path = '/signup' element = {<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
