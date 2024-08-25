import React, { useContext, useState } from 'react'
import style from './ForgetPassword.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { Helmet } from 'react-helmet'

export default function ForgetPassword() {
  let {userLogin,setuserLogin} = useContext(UserContext)
  const navigate = useNavigate()
  const [isLoading, setisLoading] = useState(false)

  function handleForgetPassword(values){
   setisLoading(true)
  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
  .then( (res) => {
    setisLoading(false)
    console.log(res);
    
    if(res.data.statusMsg == "success"){
     
      navigate("/verifycode")
    }
  })
  .catch( (res) => {
    setisLoading(false)
  })


 

  }

 



let formik = useFormik({
  initialValues: {
    email: "",
  },
  onSubmit : handleForgetPassword
})


  return <>
   <Helmet>
                <meta charSet="utf-8" />
                <title>forget-password</title>      
                <meta name="keywords" content="forget-password" />      
  </Helmet>

<div className='my-8'>
  <h2 className='font-bold text-2xl text-emerald-600 mb-3'>please enter your email</h2>
  <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto">
  <div className="relative z-0 w-full mb-5 group">
      <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
      <label htmlFor="email" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
      
  </div>
 
 <div className='flex gap-4 items-center'>
 <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">{isLoading ? <i className="fas fa-spinner fa-spin"></i> : "verify"}</button>
 </div>

  </form>
</div>
  </>
}
