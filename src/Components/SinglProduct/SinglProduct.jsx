import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function SinglProduct({product,onToggle,isInWishlist}) {
    let {addProductToCart , setNumberItems , numberItems} = useContext(CartContext) 
    const [loading, setLoading] = useState(false)
    const [currentId, setCurrentId] = useState(0)

    function test() {
        console.log("test");
        onToggle()
    }

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

  return (
    <div key={product.id}>
           
    <div className='product p-2 my-2 hover:shadow-lg hover:shadow-emerald-600 duration-300 border rounded-lg'>
    <div className='text-end'>
    <button
     onClick={onToggle}
   >
     {isInWishlist ? <i className=' fa-solid fa-heart text-3xl text-red-600'></i> : <i className='fa-regular fa-heart text-3xl'></i>}
   </button>

    </div>
    <Link to={`productdetails/${product.id}/${product.category.name}`}>
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
  )
}
