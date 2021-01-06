import React, {useState} from "react"
import {TextField, Button,} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {useHistory} from "react-router"
import {Link} from "react-router-dom"
import {auth} from "../firebase"

const useStyles = makeStyles({
  container: {
    width: "500px",
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    textAlign: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    marginBottom: "15px"
  },
  formButton: {
    width: "50%",
    margin: "0 auto 15px auto",
    height: "45px"
  }
})

const Login = () => {
  const classes = useStyles()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      history.push("/")
      console.log('ログイン成功')
    })
    .catch((error) => {
      console.log("ログイン失敗",error)
    })
  }

  return (
    <div className={classes.container}>
      <h1>ログインページ</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField variant="outlined" label="メールアドレス" value={email} onChange={e => setEmail(e.target.value)}/>
        <TextField type="password" variant="outlined" label="パスワード" className={classes.input} value={password} onChange={e => setPassword(e.target.value)}/>
        <Button type="submit" variant="contained" color="secondary" className={classes.formButton}>ログイン</Button>
        <Link to="/signup" style={{fontSize: "20px"}}>まだアカウントをお持ちでない方</Link>
      </form>
    </div>
  )
}

export default Login