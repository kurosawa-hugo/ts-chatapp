import React, {FC, createContext, useState, useEffect} from "react"
import {auth} from "../firebase"

const AuthContext = createContext<UserState>({
  isLogin: false,
  isLoading: true,
})

type UserState = 
{
  name: string | null;
  isLogin: true;
  isLoading: false;
  uid: string;
} |
{
  isLogin: false;
  isLoading: boolean;
}

const AuthProvider: FC = ( {children}  ) => {
  const [user,setUser] = useState<UserState>({isLogin: false, isLoading: true})

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        setUser({isLogin: true, name: authUser.displayName, isLoading: false, uid: authUser.uid})
      } else {
        setUser({ isLogin: false, isLoading: false })
      }
    })
  }, [])
  return (
      <AuthContext.Provider value={user}>
          {children}
      </AuthContext.Provider>
        )
}

export {
  AuthContext,
  AuthProvider
}