import {useContext} from "react"
import firebase, {db} from "../firebase"
import {AuthContext} from "../component/AuthService"
import { nanoid } from "nanoid"

const useSaveMessage= () => {
  const userState = useContext(AuthContext)
  
  const saveMessage = (text: string) => {
    if(userState.isLogin) {
        return (
        db.collection("messages").add({
         createdAt: firebase.firestore.Timestamp.now(),
         user: userState.name,
         content: text,
         id: nanoid(),
         uid: userState.uid,
         isLogin: true
       })
       )
      } else {
        return Promise.reject("ログインしてください")
      }
  }
  
  return {saveMessage}
}

export default useSaveMessage