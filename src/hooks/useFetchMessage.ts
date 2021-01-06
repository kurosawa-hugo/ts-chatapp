import {useState, useEffect} from "react"
import firebase, {db} from "../firebase"

type timeStamp = firebase.firestore.Timestamp

type Message = {
  content: string,
  user: string,
  id: string,
  uid: string,
  createdAt: timeStamp
}

const useFetchMessage = () => {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    db.collection("messages").orderBy("createdAt").onSnapshot((querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          content: doc.data().content,
          user: doc.data().user,
          id: doc.id,
          uid: doc.data().uid,
          isLogin: true,
          createdAt: doc.data().createdAt
        })))
    })
  }, [])
  
  return {messages}
}

export default useFetchMessage