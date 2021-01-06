import React, {useState} from "react"
import {TextField, Button,} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {useHistory} from "react-router"
import {Link} from "react-router-dom"
import {auth} from "../firebase"
import useInput from "../hooks/useInput"

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

const Signup = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const name = useInput('')
  const email = useInput('')
  const password = useInput('')

  const history = useHistory()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    auth.createUserWithEmailAndPassword(email.value, password.value)
    .then((response) => {
      response.user?.updateProfile({
        displayName: name.value
      })
      .then(() => {
        history.push("/")
        console.log(response.user)
        setLoading(false)
      })
    })
    .catch((error) => {
      console.log("登録失敗",error)
      setLoading(false)
    })
  }

  return (
    <div className={classes.container}>
      <h1>アカウント作成ページ</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField variant="outlined" label="ユーザー名" {...name}/>
        <TextField variant="outlined" label="メールアドレス" {...email}/>
        <TextField type="password" variant="outlined" label="パスワード" className={classes.input} {...password}/>
        <Button type="submit" variant="contained" color="primary" className={classes.formButton} disabled={loading}>アカウントを作成</Button>
        <Link to="/login" style={{fontSize: "20px"}}>既にアカウントをお持ちの方</Link>
      </form>
    </div>
  )
}

export default Signup