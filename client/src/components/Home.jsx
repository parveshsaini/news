import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Articles from './Articles'
import axios from 'axios'
import Card from './Card'

const Home = () => {
  const [articles, setArticles] = useState([])

  useEffect(()=> {
    axios.get('http://localhost:3000/news').then((res)=> {
      setArticles(res.data.articles)
      console.log("articles", res.data.articles)
    }).catch((err)=> {
      console.log(err)
    })
  }, [])
  return (
    
       <div className=' flex flex-col gap-y-10 mx-32'>
       <Navbar/>
        <Articles/>

    
    </div>
    
  )
}

export default Home
