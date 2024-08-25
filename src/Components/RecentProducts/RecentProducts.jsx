import React, { useCallback, useContext, useEffect, useState } from 'react'
import style from './RecentProducts.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useProducts from '../../Hooks/useProducts'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext'
import SinglProduct from '../SinglProduct/SinglProduct'


export default function RecentProducts() {

let {addProductToWishList, wishList, deleteWishListItem , wishListId , toggleWishlistItem}  =  useContext(WishListContext)


let { data , error , isError , isLoading } = useProducts()







console.log("wishListId" ,wishListId);


const isInWishlist = (productId) => {
  // console.log(productId);
  return wishList.some(item => item.id === productId)
  
};



  if (isError) {
    return <h3>{error.message}</h3>
  }

  if (isLoading) {
    return <div className="spinner bg-[#3BBA3E]"></div>
  }

  

console.log("recentProduct" ,wishListId);

  return <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        { data?.data?.data.map((product)=> (
       <SinglProduct  key={product.id} product={product} isInWishlist={wishListId?.has(product.id)}
       onToggle={() => toggleWishlistItem(product.id)}/>
        ))}
      </div>
  </>
}
