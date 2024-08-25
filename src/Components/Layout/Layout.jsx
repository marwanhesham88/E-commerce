import React from 'react'
import style from './Layout.module.css'
import Navbar from './../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return <>

   <Navbar />

   <div className='container mx-auto py-16 md:py-8'>
     <Outlet />
   </div>

   
  </>
}
