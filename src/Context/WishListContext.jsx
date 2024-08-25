import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";



export let WishListContext = createContext()

export default function WishListContextProvider(props){
    const [cartId, setCartId] = useState(0)
    const [numberItems, setNumberItems] = useState(0)
    const [wishList, setWishList] = useState([])
    const {userLogin} = useContext(UserContext)


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



 useEffect(()=>{
    userLogin && getLoggedUserWishList()
  },[userLogin])


 



    return <WishListContext.Provider value={   { getLoggedUserWishList , addProductToWishList , deleteWishListItem , cartId , setNumberItems , numberItems , wishList }   }>
        {props.children}
    </WishListContext.Provider>

}