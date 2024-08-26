import React, { useContext, useEffect, useState } from 'react'
import style from './Allorders.module.css'
import axios from 'axios'
import { CartContext } from '../../Context/CartContext'
import { UserContext } from '../../Context/UserContext'
import { jwtDecode } from "jwt-decode";
import { Helmet } from 'react-helmet'


export default function Allorders() {
  let {  userId , getLoggedUserCart} =  useContext(CartContext)
  const [orders, setOrders] = useState([])
  const {id} = jwtDecode(localStorage.getItem("userToken"));

  console.log( "Auth",id);

  // const {id} = useContext(UserContext)
  // console.log("Auth", id);
  
function getMyOrders() {

  axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
  .then((res)=>{
  console.log(res.data);
  setOrders(res.data)

  })
}
 
// useEffect(() => {
  
//   getLoggedUserCart()

// }, [])

  

  useEffect(() => {
  id &&  getMyOrders()
  }, [id])
  
  return <>
  <Helmet>
                <meta charSet="utf-8" />
                <title>all-orders</title>  
                <meta name="keywords" content="all-orders" />         
  </Helmet>
  <h2 className='text-emerald-600 text-4xl font-normal text-center mt-8 mb-4'>Allorders</h2>
  <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
  
  {orders.map( (order) => <div key={order._id}>
  <div className='hover:shadow-lg hover:shadow-emerald-600 duration-300 mt-6 border rounded-lg cursor-pointer px-4'>
       {order.cartItems.map((cartItem)=> <div key={cartItem._id}>
       <img src={cartItem.product.imageCover} alt={cartItem.product.title} className='w-full' />
       <h3 className='text-emerald-600'>{cartItem.product.category.name}</h3>
       <h3 className='font-semibold mb-1'>{cartItem.product.title.split(" ").slice(0,2).join(" ")}</h3>
       <div className='flex justify-between p-3'>
         <span className='flex justify-center items-center'>{cartItem.price} EGP</span>
         <span className='bg-emerald-600 p-4'>{cartItem.count} </span>
       </div>
       
       </div>)} 
    
<div className='py-4'>
<h3 className='font-semibold mb-1 text-start pb-2'><span className='text-emerald-600'>order at : </span> {order.paidAt}</h3>
     <h4 className='font-semibold mb-1 text-start pb-2'><span className='text-emerald-600'>payment by : </span>  {order.paymentMethodType}</h4>
     <div className='font-semibold mb-1 text-start pb-2'>
     <h4 className='pb-2'><span className='text-emerald-600'>details : </span>   {order.shippingAddress.details}</h4>
     <h4 className='pb-2'><span className='text-emerald-600'>city : </span>   {order.shippingAddress.city}</h4>
     <h4 className='pb-2'><span className='text-emerald-600'>phone : </span>   {order.shippingAddress.phone}</h4>
     </div>
     <h4 className='font-semibold mb-1 text-start pb-2'><span className='text-emerald-600'>shippingPrice : </span>   {order.shippingPrice}</h4>
     <h4 className='font-semibold mb-1 text-start pb-2'><span className='text-emerald-600'>taxPrice : </span>   {order.taxPrice}</h4>
     <h4 className='font-semibold mb-1 text-start pb-2'><span className='text-emerald-600'>totalOrderPrice : </span>   {order.totalOrderPrice}</h4>
     <h4 className='font-semibold mb-1 text-start pb-2'><span className='text-emerald-600'>isDelivered : </span>   {order.isDelivered ? "yes" : "no"}</h4>


</div>
    
     </div>
    </div> )}
    </div>
    
      

  </>
}
