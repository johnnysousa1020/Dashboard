import { useEffect, useState } from "react";
import "../styles/SeriesMovies.css"

export default function Series(){
    const [search, setSearch] = useState("")
    const [series, setSeries] = useState([])
    const API_KEY = "c76bad2263fc16cba9d6e7783c91c00b";

    async function fetchSeries(query) {
        if(!query) return;

        const response = await fetch(
            `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=pt-BR&query=${query}`
        )

        const data = await response.json()
        setSeries(data.results || [])
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchSeries(search)
        }, 600)

        return () => clearTimeout(timer)
    }, [search])

    return(
        <div className="page-container">
            <h1 className="page-title">Series</h1>

        <div className="search-area">
            <input 
            type="text" 
            placeholder="Pesquisar série..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />

            <button className="search-btn" onClick={() => fetchSeries(search)}>Buscar</button>
        </div>

            <div className="grid-movies">
                {series.map((tv) => (
                    <div key={tv.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w300${tv.poster_path}`} 
                        alt={tv.name} />
                    <h3>{tv.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    )

}