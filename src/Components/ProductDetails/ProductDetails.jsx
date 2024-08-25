import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from 'react-slick'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishListContext } from '../../Context/WishListContext'
import SecondProduct from '../SecondProduct/SecondProduct'
import {Helmet} from "react-helmet";


export default function ProductDetails() {
  const [heartColor, setHeartColor] = useState(false)
  let {addProductToCart , setNumberItems , numberItems} = useContext(CartContext) 
  let {addProductToWishList, wishList, deleteWishListItem , wishListId , toggleWishlistItem}  =  useContext(WishListContext)
  const [loading, setLoading] = useState(false)
  const [currentId, setCurrentId] = useState(0)
  const [currentId2, setCurrentId2] = useState(0)
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false
  };
  let {id , category} = useParams()

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

 

  console.log("wishListId" ,wishListId);

  const isInWishlist = (productId) => {
    // console.log(productId);
    return wishList.some(item => item.id === productId)
    
  };

 
  
  function getProduct(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then((res)=>{
      console.log(res.data.data)
      setProduct(res.data.data)
    })
    .catch((res)=>{
      console.log(res)
    })
  }

  function getAllProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((res)=>{
    let related =  res.data.data.filter((product) => product.category.name == category )
   setRelatedProducts(related)
    })
  }

 

  useEffect(() => {
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
   getProduct(id)
   getAllProducts()
  }, [ id , category ])
  
  console.log("recentProduct" ,wishListId);

  return <>

 <div className="row items-center">
  <div className="w-full md:w-1/4">
  <Slider {...settings}>
    {product?.images.map((src) => <img key={product.id} src={src} className='w-full' />)}
  </Slider>
  </div>
  <div className="sm:w-full md:w-3/4 p-4 text-start">
  <h3 className='font-semibold capitalize text-2xl'>{product?.title}</h3>
  <Helmet>
                <meta charSet="utf-8" />
                <title>{product?.title}</title>
                <meta name="keywords" content={product?.slug} />
  </Helmet>
  <h4 className='text-gray-500 my-4'>{product?.description} .</h4>
  <h4 className='font-medium'>{product?.category.name}</h4>
  <div className='flex justify-between p-3 my-5'>
  <span>{product?.price} EGP</span>
  <span><i className='fas fa-star text-yellow-400'></i> {product?.ratingsAverage}</span>
  </div>
  <div className='text-center'>
  
  </div>
  <button className='btn' onClick={()=> addToCart(product.id)}>{loading && currentId == product.id ? <i className='fas fa-spinner fa-spin'></i> : "Add To Cart"}</button>
  </div>
 </div>

 <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        { relatedProducts.length > 0 ?    relatedProducts.map((product)=> (
           <SecondProduct  key={product.id} product={product} isInWishlist={wishListId?.has(product.id)}
       onToggle={() => toggleWishlistItem(product.id)}/>
        )) : <div className="spinner bg-[#3BBA3E]"></div> }
      </div>

  </>
}
