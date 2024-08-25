import React from 'react'
import style from './MainSlider.module.css'
import slide2 from '../../assets/aloo.jpg'
import slide3 from '../../assets/aloo2.jpg'
import slide4 from '../../assets/aloo3.jpg'
import slide5 from '../../assets/aloo4.jpg'
import slide6 from '../../assets/aloo5.jpg'
import Slider from 'react-slick'



export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return <>
 <div className="row items-center justify-center mt-5">
  <div className="mb-8 w-full md:w-1/2 ">
 <Slider {...settings} className=''>
  <img src={slide2} className='w-full h-[500px] object-contain' alt="slide2" />
  <img src={slide3} className='w-full h-[500px] object-contain' alt="slide3" />
  <img src={slide4} className='w-full h-[500px] object-contain' alt="slide4" />
 </Slider>
  </div>
  <div className="w-full md:w-1/2 lg:w-1/3">
  <img src={slide5} className='w-full h-auto md:h-[300px]' alt="slide5" />
  <img src={slide6} className='w-full h-auto md:h-[300px]' alt="slide6" />
  </div>
 </div>
  </>
}
