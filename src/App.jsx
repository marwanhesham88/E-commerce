import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Products from './Components/Products/Products';
import Notfound from './Components/Notfound/Notfound';
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast';
import Checkout from './Components/Checkout/Checkout'
import Allorders from './Components/Allorders/Allorders'
import WishList from './Components/WishList/WishList'
import WishListContextProvider from './Context/WishListContext'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import VerifyCode from './Components/VerifyCode/VerifyCode'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import { Detector } from 'react-detect-offline'


let query = new QueryClient()

let router = createBrowserRouter([
  {path:"", element: <Layout />, children: [
    {index:true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
    {path:"cart", element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
    {path:"wishList", element: <ProtectedRoute> <WishList /> </ProtectedRoute> },
    {path:"brands", element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
    {path:"checkout", element: <ProtectedRoute> <Checkout /> </ProtectedRoute> },
    {path:"allorders", element: <ProtectedRoute> <Allorders /> </ProtectedRoute> },
    {path:"productdetails/:id/:category", element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
    {path:"register", element: <Register />},
    {path:"login", element: <Login />},
    {path:"forgetpassword", element: <ForgetPassword />},
    {path:"verifycode", element: <VerifyCode />},
    {path:"resetpassword", element: <ResetPassword />},
    {path:"categories", element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
    {path:"products", element: <ProtectedRoute> <Products /> </ProtectedRoute> },
    {path:"*", element: <Notfound />},
  ]}
])
function App() {
  

  return (
    <>
  

    <Detector
  render={({ online }) => (
    <div className={`${online ? "" : "bg-red-500 fixed bottom-4 right-2 rounded-lg z-50 p-4"}`}>
      {online ? "" : "You are currently offline"}
    </div>
  )}
   />
    <UserContextProvider>
      <QueryClientProvider client={query}>
      <CartContextProvider>
      <WishListContextProvider>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
      </WishListContextProvider>
      </CartContextProvider>
      </QueryClientProvider>
    </UserContextProvider>
    </>
  )

}

export default App
