import { auth } from "./services/firebase";
import { signOut } from "firebase/auth";

export default function Navbar({ openSidebar }){
    const handleLogount = () => {
        signOut(auth)
        window.location.href = "/login"
    }

    return(
        <header className="navbar">
            <button className="menu-btn" onClick={openSidebar}>≡</button>
            <h1 className="navbar-title">Filmes Dashboard</h1>

            <button className="logount-btn" onClick={handleLogount}>Sair</button>
        </header>
    )
}