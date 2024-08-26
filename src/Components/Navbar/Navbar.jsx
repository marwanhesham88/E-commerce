import React, { useContext, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'


export default function Navbar() {
  let {numberItems , setNumberItems} = useContext(CartContext)
  const [navbarOpen, setNavbarOpen] = useState(false);
  let {userLogin , setuserLogin} = useContext(UserContext)
  let navigate = useNavigate()

  function signOut(){
    localStorage.removeItem("userToken")
    setuserLogin(null)
    navigate("/login")
  }

  return <>
  

<nav className="border-gray-200 bg-slate-200 fixed top-0 left-0 right-0 flex flex-wrap items-center justify-between z-50">
    <div className="container px-4 mx-auto flex flex-wrap items-center justify-between p-4">
       <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
       <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} width="110px" className="h-8" alt="Flowbite Logo" />
       
        </Link>
        <button
              className="text-black  cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
        
       </div>
        <div  className={
              "lg:flex lg:flex-row flex-grow items-center" +
              (navbarOpen ? " flex flex-col gap-y-8 pt-4 mx-auto" : " hidden")
            }
            id="example-navbar-danger">
        {userLogin != null ? <>
          <ul className='flex flex-col lg:flex-row list-none lg:ml-auto gap-4'>
          <li><NavLink className="text-gray-600" to="">Home</NavLink></li>
          <li><NavLink className='relative text-gray-600' to="cart"><i className="fa-solid fa-cart-shopping"></i> <div className='absolute top-[-16px] right-[-14px] p-1 size-5 bg-emerald-600 text-white rounded-full flex justify-center items-center'>{numberItems}</div></NavLink></li>
          <li><NavLink className="text-gray-600" to="wishList">wish list</NavLink></li>
          <li><NavLink className="text-gray-600" to="products">Products</NavLink></li>
          <li><NavLink className="text-gray-600" to="categories">Categories</NavLink></li>
          <li><NavLink className="text-gray-600" to="brands">Brands</NavLink></li>
          <li><NavLink className="text-gray-600" to="allorders">All orders</NavLink></li>
        </ul>
        </> : null}
            <div className="links flex flex-col lg:flex-row list-none lg:ml-auto gap-4">
              {userLogin != null ? <span onClick={signOut}  className="text-base cursor-pointer text-gray-600">log out</span> : <>
                <NavLink to="register" className="text-base text-gray-600">Register</NavLink>
                <NavLink to="login" className="text-base text-gray-600">Login</NavLink>
              </>}
            
            </div>
        </div>
    </div>
</nav>


  </>
}
