import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";



export let UserContext = createContext()

export default function UserContextProvider(props){


const [userLogin, setuserLogin] = useState( localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null )


const {id} = jwtDecode(localStorage.getItem("userToken"));

console.log( "Auth",id);





    return <UserContext.Provider value={   { userLogin , setuserLogin , id }   }>
        {props.children}
    </UserContext.Provider>

}