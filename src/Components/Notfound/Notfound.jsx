import React from 'react'
import style from './Notfound.module.css'
import error from '../../assets/error.svg'
import { Helmet } from 'react-helmet'
export default function Notfound() {
  return <>
  <Helmet>
                <meta charSet="utf-8" />
                <title>not-found</title>  
                <meta name="keywords" content="not-found" />         
  </Helmet>
   <img src={error} className='w-full mt-2' alt="error" />
    
  </>
}
