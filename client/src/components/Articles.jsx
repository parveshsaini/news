import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios'
import { useArticle } from './ArticleContext'

const Articles = () => {
  

  const {articles, loading} = useArticle()
  return (
    <div className='flex flex-col gap-y-8'>
        {!loading ? articles && articles.map((article, idx)=> {
          return <Card key={idx} article={article}/>
        }) :
        <h1>Loading...</h1>
        }

    </div>
  )
}

export default Articles
