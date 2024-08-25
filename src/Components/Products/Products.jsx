import React, { useContext, useEffect, useState } from 'react'
import style from './Products.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useProducts from '../../Hooks/useProducts'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishListContext } from '../../Context/WishListContext'
import {Helmet} from "react-helmet";

export default function Products() {
  const [heartColor, setHeartColor] = useState(false)
  let {addProductToCart , setNumberItems , numberItems} = useContext(CartContext) 
  let {addProductToWishList}  =  useContext(WishListContext)
  let { data , error , isError , isLoading } = useProducts()
  const [loading, setLoading] = useState(false)
  const [currentId, setCurrentId] = useState(0)
  const [currentId2, setCurrentId2] = useState(0)

  async function addToCart(id) {
    setCurrentId(id)
    setLoading(true)
  let response =  await addProductToCart(id)
  console.log(response.data)
  
  if (response.data.status == "success") {
    setNumberItems(numberItems + 1)
    toast.success(response.data.message)
    setLoading(false)
  }else{
    toast.error(response.data.message)
    setLoading(false)
  }
  }

  async function addToWishList(id) {
    setCurrentId2(id)
        setHeartColor(true)
       
        let response =  await addProductToWishList(id)
        if (response.data.status == "success") {
         
          toast.success(response.data.message)
          
        }else{
          toast.error(response.data.message)
        
        }
  }

   if (isError) {
    return <h3>{error.message}</h3>
  }
 
   if (isLoading) {
     return <div className="spinner bg-[#3BBA3E]"></div>
   }
 
   return <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>products</title>      
                <meta name="keywords" content="products" />      
    </Helmet>

       <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         { data?.data?.data.map((product)=> (
           <div key={product.id}>
            
            <div className='product p-2 my-3 hover:shadow-lg hover:shadow-emerald-600 duration-300 border rounded-lg'>
            <div className='text-end'>
           <i className={`fa-regular fa-heart text-3xl cursor-pointer  ${heartColor && currentId2 == product.id ? 'fa-solid fa-heart text-3xl cursor-pointer text-red-600' : ''}`}  onClick={()=> addToWishList(product.id)}></i>
           </div>
            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
               <img src={product.imageCover} alt={product.title} className='w-full' />
               <h3 className='text-emerald-600'>{product.category.name}</h3>
               <h3 className='font-semibold mb-1'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
               <div className='flex justify-between p-3'>
                 <span>{product.price} EGP</span>
                 <span><i className='fas fa-star text-yellow-400'></i> {product.ratingsAverage}</span>
               </div>
               </Link>
              
               <button className='btn' onClick={()=> addToCart(product.id)}>{loading && currentId == product.id ? <i className='fas fa-spinner fa-spin'></i> : "Add To Cart"}</button>
 
             </div>
            
           </div>
         ))}
       </div>
   </>
}
