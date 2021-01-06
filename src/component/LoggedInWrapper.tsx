import React, {FC, useContext} from "react"
import {Redirect} from "react-router-dom"
import {AuthContext} from "./AuthService"
import { CircularProgress } from "@material-ui/core"

const LoggedInWrapper: FC = ( {children} ) => {
  const userState = useContext(AuthContext)

  if (userState.isLoading) {
    return <CircularProgress />
  }

  if(!userState.isLogin) {
    return <Redirect to="./login" /> 
   }

   return <>{children}</>
}

export default LoggedInWrapper