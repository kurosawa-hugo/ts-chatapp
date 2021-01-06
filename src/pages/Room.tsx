import React, { useContext, useEffect} from "react"
import {auth, db} from "../firebase"
import {AuthContext} from "../component/AuthService"
import useFetchMessage from "../hooks/useFetchMessage"
import useInput from "../hooks/useInput"
import useSaveMassage from "../hooks/useSaveMessage"
import {Card, CardContent, Button, Typography} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles({
  myCard: {
    marginTop: "15px",
    backgroundColor: "#00e64d",
    maxWidth: "49%",
    marginLeft: "auto",
    borderRadius: "10px 0 10px 10px"
  },
  otherCard: {
    marginTop: "15px",
    backgroundColor: "#fff",
    maxWidth: "49%",
    marginRight: "auto",
    borderRadius: "0 10px 10px 10px"
  },
  date: {
    display: "inline"
  }
})

const Room = () => {
  const {value, onChange, reset} = useInput("")
  const classes = useStyles()
  const userState = useContext(AuthContext)
  const logout = () => {
    auth.signOut()
  }
  const {messages} = useFetchMessage()
  const {saveMessage} = useSaveMassage()

  const deleteMessage = (e: React.MouseEvent<HTMLElement>) => {
    const button = e.currentTarget!
    const card = button.parentNode!.parentNode!
    const li = card.querySelector("li")!
    const id = li.id
    db.collection("messages").doc(id).delete()
  }

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    saveMessage(value).then(() => {
      reset()
    })
  }
  
  const style = () => {
    messages.forEach(message => {
          if(userState.isLogin && message.uid === userState.uid) {
              console.log("右")
              const card =  document.getElementById(message.id)!
              card.className = classes.myCard

          } else{
              console.log("左")
              const card =  document.getElementById(message.id)!
              card.className = classes.otherCard
              const button: HTMLButtonElement = card.querySelector("#button")! as HTMLButtonElement
              button.style.display = "none"
            }
      })
    }

  useEffect(() => {
    style()
  },[messages])


  return (
    <div style={{padding: "0 20px"}}>
    <ul style={{padding: "0"}}>
      {messages.map((message) => {
        return (
          <Card id={message.id} key={message.id}><CardContent>
            <Typography className={classes.date} color="textSecondary" gutterBottom>{message.createdAt.toDate().toDateString()}</Typography>
            <div id="button" style={{display: "inline"}}>
            <Button color="primary" onClick={deleteMessage}>
            削除
            </Button>
            </div>
            <li style={{listStyle: "none"}} key={message.id} id={message.id} className="li">{message.content} - 投稿者:{message.user}</li></CardContent>
          </Card>
      )})}
    </ul>
    <button onClick={logout}>ログアウト</button>
    <form onSubmit={handleSubmit}>
      <input value={value} onChange={onChange} style={{width: "300px"}}/>
      <button type="submit">送信</button>
    </form>
    </div>
  )
}

export default Room