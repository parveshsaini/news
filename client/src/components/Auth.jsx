// AuthContext.js
import  { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';


const AuthContext = createContext(undefined);


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading]= useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUser()
    }else{
      console.log("No token found");
    }
  }, []);

  const getUser= async()=> {
    setLoading(true)
    const res= await axios.get(`http://localhost:3000/me`, {headers: {Authorization: token}});

    if(res.data){
        setUser(res.data)
        console.log("fetch user data", res.data)
    }

    setLoading(false)
  }

  const login = async (credentials) => {
    setLoading(true)
    try {
      const res = await axios.post(`http://localhost:3000/login`, credentials);
      localStorage.setItem('token', res.data.token);
      console.log("success login")
      setUser(res.data.user);
    } catch (error) {
      console.log("error logging in.....",error)
      if(error) {
        throw new Error(error.response.data);
      }
      else{
        throw new Error("Something went wrong");
      }
    }
    setLoading(false)
  };


  const signup = async (creadentials) => {
    setLoading(true)
    try {
      const res = await axios.post(`http://localhost:3000/signup`, creadentials);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
    } catch (error) {
      if(error instanceof Error) {
        throw new Error(error.message);
      }
      else{
        throw new Error("Something went wrong");
      }
    }
    setLoading(false)
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('No Context');
    }
    return context;
  };
  