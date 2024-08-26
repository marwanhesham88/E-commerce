import React, { useContext, useState } from 'react'
import style from './Checkout.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
import {Helmet} from "react-helmet";


export default function Checkout() {
  const [isLoading, setisLoading] = useState(false)
  let {checkout , cartId} = useContext(CartContext)

  let validationSchema = Yup.object().shape({ 
    details: Yup.string().min(3, "details min length is 3").required("details is required"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "invalid phone number").required("phone is required"),
    city: Yup.string().required("city is required")
  })

  // console.log( "href",window.location);


let formik = useFormik({
  initialValues: {
    details: "",
    phone: "",
    city: "",
  },
  validationSchema,
  onSubmit : () => handleCheckout(cartId ,`${window.location.origin}`)
})

async function handleCheckout(cartId, url){
  setisLoading(true)
    let {data} =  await checkout(cartId , url , formik.values)
    console.log(data);    
    window.location.href = data.session.url
    setisLoading(false)
    
 }


  return <>
  <Helmet>
                <meta charSet="utf-8" />
                <title>check-out</title>  
                <meta name="keywords" content="check-out" />         
  </Helmet>
<div className='my-8'>
  
  <h2 className='font-bold text-2xl text-emerald-600 mb-3'>Checkout Now</h2>
  <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto">
  <div className="relative z-0 w-full mb-5 group">
      <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
      <label htmlFor="details" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your details</label>
      {formik.errors.details && formik.touched.details ? (<span className='text-red-500'>{formik.errors.details}</span>) : null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="tel" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
      <label htmlFor="phone" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your phone</label>
      {formik.errors.phone && formik.touched.phone ? (<span className='text-red-500'>{formik.errors.phone}</span>) : null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
      <label htmlFor="city" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your city</label>
      {formik.errors.city && formik.touched.city ? (<span className='text-red-500'>{formik.errors.city}</span>) : null}
  </div>
 <div className='flex gap-4 items-center'>
 <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">{isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Checkout"}</button>
 </div>
  </form>
</div>
  </>
}
