import React, { createContext, useState } from "react";
import UserDetail from "../entities/UserDetail.sample";

const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [userData, setUserData] = useState({...UserDetail})
   
    return(
        <UserContext.Provider value={[userData, setUserData]} >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
