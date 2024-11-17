import React from 'react'
import Search from './Search'
import { useAuth } from './Auth'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const {user}= useAuth()
  const navigate = useNavigate();

  console.log("user is : "  , user)
  return (
    <nav className='flex items-center justify-between'>
        <h3 className='font-bold text-xl'>News Market</h3>

        <Search/>

        <div className='flex gap-4 items-center'>

       
        {user? <h3 className='text-lg'>Welcome, <span className='font-semibold underline underline-offset-2'>{user.username}</span> </h3>
        
        : <a  onClick={()=>navigate('/signup')} className='bg-slate-800 text-white px-2 py-1 rounded-md cursor-pointer'>Signup</a>}

        {user && <button onClick={()=>{
           localStorage.clear('token')
           window.location.reload()
           
           }} className=' px-2 py-1 rounded-md cursor-pointer bg-slate-800 text-white'>Logout</button>}
        </div>
      
    </nav>
  )
}

export default Navbar
