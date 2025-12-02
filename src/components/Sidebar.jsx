import { Link } from "react-router-dom";

export default function Siderbar({ isOpen, closeSidebar }){
    return(
        <aside className={`sidebar ${isOpen ? "open" : ""}`}>
            <button className="close-btn" onClick={closeSidebar}>X</button>
            <h2 className="sidebar-title">Dashboard</h2>

            <nav>
                <Link to="/dashboard" className="sidebar-link">Home</Link>
                <Link to="/dashboard/moviestable" className="sidebar-link">Filmes</Link>
                <Link to="/dashboard/seriestable" className="sidebar-link">Séries</Link>
            </nav>
        </aside>
    )
}