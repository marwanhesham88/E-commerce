import React, { useContext, useEffect, useState } from 'react'
import style from './WishList.module.css'
import toast from 'react-hot-toast'
import { WishListContext } from '../../Context/WishListContext'
import { CartContext } from '../../Context/CartContext'
import axios from 'axios'
import {Helmet} from "react-helmet";


export default function WishList() {
  const [loading, setLoading] = useState(false)
  const [currentId, setCurrentId] = useState(0)

  let { addProductToCart , setNumberItems , numberItems  } = useContext(CartContext)
  let { getLoggedUserWishList  , deleteWishListItem  } = useContext(WishListContext)
 
  const [wishListDetails, setWishListDetails] = useState(null)
  

  async function getWishListItems() {
    
    
    let response =  await getLoggedUserWishList()
    
    console.log(response.data.data)
  
    if (response.data.status == "success") {
      setWishListDetails(response.data.data)
      
    }
    
  
    }


    async function deleteItem(productId) {
      let response = await deleteWishListItem(productId)
      console.log(response)

      let headers = {
        token: localStorage.getItem("userToken")
    }

      function getLoggedUserWishList() {
         axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
         .then( (res) => {
          console.log(res);
          if (response.data.status == "success") {
        
        setWishListDetails(res.data.data)
        toast.success("product updated successfully")
      }else{
        toast.error("error")
      }
         } )
         .catch( (err) => err )
     }
  
     getLoggedUserWishList()
    }


    async function addToCart(id) {
      setCurrentId(id)
      setLoading(true)
    let response =  await addProductToCart(id)
    console.log(response)
    
    if (response.data.status == "success") {
      setNumberItems(numberItems + 1)
      toast.success(response.data.message)
      setLoading(false)
      deleteItem(id)
    }else{
      toast.error(response.data.message)
      setLoading(false)
    }

  }




    useEffect(()=>{
      getWishListItems()
    },[])

  return <>
  <Helmet>
                <meta charSet="utf-8" />
                <title>wish list</title>  
                <meta name="keywords" content="wish list" />         
  </Helmet>
  
  {wishListDetails?.length > 0 ? <>
  
<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Add To Cart</span>
        </th>
      </tr>
    </thead>
    <tbody>
      {wishListDetails?.map((product)=> <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4" >
          <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.title} />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white" >
        {product.title}
        </td>
        
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white" >
          {product.price} EGP
        </td>
        <td className="px-6 py-4"  >
          <span  onClick={()=> deleteItem(product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
        </td>
        <td>
        <button className='btn' onClick={()=> addToCart(product.id)}>{loading && currentId == product.id ? <i className='fas fa-spinner fa-spin'></i> : "Add To Cart"}</button>
        </td>
      </tr> )}
      
    </tbody>
  </table>
</div>

  </> : <h1 className='text-3xl text-start bg-slate-200 my-14 p-14'>My wish List</h1>}

  </>
}
