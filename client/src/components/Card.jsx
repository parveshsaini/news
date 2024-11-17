import React, { useEffect } from 'react'

const Card = (article) => {


  
  return (
    <div className=' gap-4 grid grid-cols-10'>
        {article.article.author ? <><img className='w-full h-full  col-span-3' src={article.article.urlToImage} alt="" />

        <div className='flex flex-col gap-2 text-left col-span-7'>
        <a href={article.article.url} target="_blank" rel="noopener noreferrer">
            <h1 className='text-2xl font-semibold'>{article.article.title}</h1>
            <div className='flex justify-between'>
              <p>{article.article.author}</p>
              <p>{new Date(article.article.publishedAt).toLocaleDateString()}</p>
            </div>
            
            <p className='text-md text-slate-700'>{article.article.description}</p>
            </a>

        </div></> : <></>}
    </div> 
  )
}

export default Card
