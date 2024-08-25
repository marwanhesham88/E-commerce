import React from 'react'
import style from './Home.module.css'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'
import {Helmet} from "react-helmet";

export default function Home() {

  
  return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>home</title>      
                <meta name="keywords" content="home" />      
     </Helmet>
    <MainSlider />
    <CategoriesSlider />
    <RecentProducts />
    </>
)
}
