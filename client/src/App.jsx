import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Articles from './components/Articles'
import { useAuth } from './components/Auth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    

    <>
    <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter></>
  )
}

export default App
