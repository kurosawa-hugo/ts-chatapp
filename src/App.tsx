import React, {FC} from "react"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Room from "./pages/Room"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {AuthProvider} from "./component/AuthService"
import LoggedInWrapper from "./component/LoggedInWrapper"

const App: FC = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact >
          <LoggedInWrapper>
            <Room />
          </LoggedInWrapper>
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
      </Switch>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App