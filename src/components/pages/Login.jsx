import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import "../pages/Login.css"

export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const user = auth.currentUser;
    console.log("Usuario logado:", user)

    const handleLogin = async (e) => {
        e.preventDefault()
        try{
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/dashboard")
          //  window.location.href = "/dashboard"
        }catch (err) {
            setError("Email ou senha incorretas")
        }
    };

    return(
        <div className="login-container">
            <div className="login-box">
            <h2>Login</h2>

            {error && <p className="error">{error}</p>}

            <form onSubmit={handleLogin}>
                <input 
                type="email" 
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>

                <input 
                type="password" 
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit">Entrar</button>
            </form>
            </div>
        </div>
    )
}