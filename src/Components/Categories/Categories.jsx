import React, { useEffect, useRef, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import { Helmet } from 'react-helmet'




export default function CategoriesSlider() {

  const [categories, setCategories] = useState([])
  const [specCategories, setSpecCategories] = useState([])
  const [subH2, setSubH2] = useState(false)
  const toBottom = useRef()


 

  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res)=>{
      console.log(res.data.data)
      setCategories(res.data.data)
    })
  }

 

  function getSpecCategory(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
    .then((res)=>{
      console.log(res.data.data)
      setSpecCategories(res.data.data)
      setSubH2(true)
      toBottom.current.scrollIntoView({ behavior: "smooth" })
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  

  useEffect(() => {
    getCategories()
  }, [])
  
  

  return <>
  <Helmet>
                <meta charSet="utf-8" />
                <title>categories</title>      
                <meta name="keywords" content="categories" />      
  </Helmet>
  
 <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
  
  {categories.map( (category) => <div key={category._id}>
  <div className='hover:shadow-lg hover:shadow-emerald-600 duration-300 mt-6 border rounded-lg cursor-pointer' onClick={() => getSpecCategory(category._id)}>
      <img src={category.image} className='w-full h-[300px] object-cover' alt={category.name} />
      <p className='font-medium text-[28px] text-emerald-600 py-4'>{category.name}</p>
     </div>
     
    </div> )}
    </div>
 
    { subH2 && <h2 className='text-emerald-600 text-3xl text-center mt-4'>related subcategories</h2>}

<div  className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

{specCategories.map((spec) => <div key={spec._id}>

<div ref={toBottom} className='hover:shadow-lg hover:shadow-emerald-600 duration-300 mt-6 border rounded-lg'>
      <p className='font-medium text-[28px] py-4'>{spec.name}</p>
     </div>
</div>)}

</div>
    

    

  </>
}
