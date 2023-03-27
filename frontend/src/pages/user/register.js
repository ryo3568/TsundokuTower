import { useState, useEffect } from "react"

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch("http://localhost:5000/user/register", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            })
            const jsonResponse = await response.json()
            alert(jsonResponse.message)
        }catch(err){
            alert("ユーザー登録失敗")
        }
    }

    useEffect(() => {
        document.title = "登録ページ"
    }, [])

    return (
        <div>
        
            <form className="register-box" onSubmit={handleSubmit}>
                <input className="register-text" value={name} onChange={(e)=> setName(e.target.value)} type="text" name="name" placeholder="ユーザー名" required />
                <input className="register-text" value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required />
                <input className="register-text" value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required />
                <button className="register">新規登録</button>
            </form>
        </div>
    )
}

export default Register