
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch("https://tsundokutower.onrender.com/user/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const jsonResponse = await response.json()
            localStorage.setItem("token", jsonResponse.token)
            props.setLogin(true)
            navigate("/")
        }catch(err){
            alert("ログイン失敗")
        }
    }

    useEffect(() => {
        document.title = "ログインページ"
    })

    return (

        <div>
        
            <form className="login-box" onSubmit={handleSubmit}>
                <input className="login-text" value={email} onChange={(e)=>setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required />
                <input className="login-text" value={password} onChange={(e)=>setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required />
                <button className="login">ログイン</button>
            </form>
        </div>
    )
}

export default Login