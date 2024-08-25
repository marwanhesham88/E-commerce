import axios from "axios";
import { createContext, useEffect, useState } from "react";



export let WishListContext = createContext()

export default function WishListContextProvider(props){
    const [cartId, setCartId] = useState(0)
    const [numberItems, setNumberItems] = useState(0)
    const [wishList, setWishList] = useState([])

let headers = {
    token: localStorage.getItem("userToken")
}



function getLoggedUserWishList() {
   return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
    .then( (res) => res )
    .catch( (err) => err )
}

function addProductToWishList(productId) {
   return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId: productId},{headers})
    .then( (res) => res )
    .catch( (err) => err )
  }



 function deleteWishListItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers})
     .then( (res) => res )
     .catch( (err) => err )
 }



 

 



    return <WishListContext.Provider value={   { getLoggedUserWishList , addProductToWishList , deleteWishListItem , cartId , setNumberItems , numberItems , wishList }   }>
        {props.children}
    </WishListContext.Provider>

}