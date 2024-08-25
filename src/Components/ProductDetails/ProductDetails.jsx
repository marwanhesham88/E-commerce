import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from 'react-slick'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishListContext } from '../../Context/WishListContext'
import {Helmet} from "react-helmet";


export default function ProductDetails() {
  const [heartColor, setHeartColor] = useState(false)
  let {addProductToCart , setNumberItems , numberItems} = useContext(CartContext) 
  let {addProductToWishList}  =  useContext(WishListContext)
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

  useEffect(() => {
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
   getProduct(id)
   getAllProducts()
  }, [ id , category ])
  

  return <>

 <div className="row items-center">
  <div className="w-full md:w-1/4">
  <Slider {...settings}>
    {product?.images.map((src) => <img key={product.id} src={src} className='w-full' />)}
  </Slider>
  </div>
  <div className="sm:w-full md:w-3/4 p-4 text-start">
  <div className='text-end'>
  <i className={`fa-regular fa-heart text-3xl cursor-pointer  ${heartColor && currentId2 == product.id ? 'fa-solid fa-heart text-3xl cursor-pointer text-red-600' : ''}`}  onClick={()=> addToWishList(product.id)}></i>
   </div>
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
          <div key={product.id}>
           
           <div className='product p-2 my-2 hover:shadow-lg hover:shadow-emerald-600 duration-300 border rounded-lg'>
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
        )) : <div className="spinner bg-[#3BBA3E]"></div> }
      </div>

  </>
}
