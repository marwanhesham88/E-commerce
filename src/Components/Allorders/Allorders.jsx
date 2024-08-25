import React, { useContext, useEffect, useState } from 'react'
import style from './Allorders.module.css'
import axios from 'axios'
import { CartContext } from '../../Context/CartContext'

export default function Allorders() {
  let {clearUserCart} =  useContext(CartContext)
  

 

  

  useEffect(() => {
    clearUserCart()
  }, [])
  
  return <>
  <h2 className='text-3xl'>Allorders</h2>
  </>
}
