import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import toast from "react-hot-toast";



export let WishListContext = createContext()

export default function WishListContextProvider(props){
    const [cartId, setCartId] = useState(0)
    const [numberItems, setNumberItems] = useState(0)
    const [wishList, setWishList] = useState([])
    const {userLogin} = useContext(UserContext)
    const [wishListId, setWishListId] = useState(null)


let headers = {
    token: localStorage.getItem("userToken")
}



function getLoggedUserWishList() {
   return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
    .then( (res) => {
        console.log(res);
        setWishListId(new Set(res.data.data.map(item => item.id)));
        setWishList(res.data.data)
        return res
    } )
    .catch( (err) => err )
}

function addProductToWishList(productId) {
   return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId: productId},{headers})
    .then( (res) => {
        setWishListId(prevWishlist => new Set(prevWishlist.add(productId)));
        setWishList(res.data.data)
        toast.success(res.data.message)

        return res
    } )
    .catch( (err) => err )
  }



 function deleteWishListItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers})
     .then( (res) => {
        setWishListId(prevWishlist => {
            const newWishlist = new Set(prevWishlist);
            newWishlist.delete(productId);
            return newWishlist;
          });
        setWishList(res.data.data)
        toast.error(res.data.message)

        return res
     } )
     .catch( (err) => err )
 }

 const toggleWishlistItem = async (itemId) => {
    console.log(itemId);
    
    if (wishListId.has(itemId)) {
      await deleteWishListItem(itemId);

    } else {
      await addProductToWishList(itemId);
    }
  };


 useEffect(()=>{
    userLogin && getLoggedUserWishList()
  },[userLogin])


 



    return <WishListContext.Provider value={   { getLoggedUserWishList , addProductToWishList , deleteWishListItem , cartId , setNumberItems , numberItems , wishList , wishListId , toggleWishlistItem }   }>
        {props.children}
    </WishListContext.Provider>

}