import React, { useEffect, useState } from 'react'
import style from './CategoriesSlider.module.css'
import axios from 'axios'
import Slider from "react-slick";

export default function CategoriesSlider() {

  const [categories, setCategories] = useState([])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };

  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res)=>{
      console.log(res.data.data)
      setCategories(res.data.data)
    })
  }

  useEffect(() => {
    getCategories()
  }, [])
  
  

  return <>
  <h2 className='my-3 capitalize font-semibold text-gray-600 text-start'>shop popular categories</h2>
 <Slider {...settings} className='mb-8'>
     {categories.map( (category) => <div key={category._id}>
      <img src={category.image} className='w-full h-[200px] object-cover' alt={category.name} />
      <h4>{category.name}</h4>
     </div> )}
    </Slider>
  </>
}
