import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import { Button, Modal } from "flowbite-react";
import { Helmet } from 'react-helmet';


export default function Brands() {
  const [brands, setBrands] = useState([])
  const [specBrands, setSpecBrands] = useState(null)
  const [openModal, setOpenModal] = useState(false);

  function getBrands() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    .then((res)=>{
      console.log(res.data.data)
      setBrands(res.data.data)
    })
  }

 

  function getSpecBrand(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    .then((res)=>{
      console.log(res.data.data)
      setSpecBrands(res.data.data)
      setOpenModal(true)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  

  useEffect(() => {
    getBrands()
  }, [])

  return <>
   <Helmet>
                <meta charSet="utf-8" />
                <title>brands</title>      
                <meta name="keywords" content="brands" />      
   </Helmet>

  <h1 className='text-emerald-600 text-4xl font-normal text-center mt-8 mb-4'>All Brands</h1>
  <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
  
  {brands.map( (brand) => <div key={brand._id}>
  <div className='hover:shadow-lg hover:shadow-emerald-600 duration-300 mt-6 border rounded-lg cursor-pointer px-4' onClick={() => getSpecBrand(brand._id)}>
      <img src={brand.image} className='w-full pe-8' alt={brand.name} />
      <p className='pt-8 pb-10'>{brand.name}</p>
     </div>
     
    </div> )}
    </div>
    
      <Modal  show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header></Modal.Header>

        <Modal.Body>
        <div className='flex justify-between items-center '>
        <div>
        <h1 className='font-medium text-[40px] py-4 text-emerald-600'>{specBrands?.name}</h1>
        <p>{specBrands?.slug}</p>
        </div>
        <div>
        <img src={specBrands?.image}  alt={specBrands?.name} />
        </div>
        </div>
        </Modal.Body>

        <Modal.Footer className='flex justify-end'>
          
          <Button  onClick={() => setOpenModal(false)}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>

  </>
}
