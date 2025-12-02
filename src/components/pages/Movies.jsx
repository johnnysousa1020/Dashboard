import { useEffect, useState } from "react";
import "../styles/SeriesMovies.css"

export default function Movies(){
    const [search, setSearch] = useState("")
    const [movies, setMovies] = useState([])
    const API_KEY = "c76bad2263fc16cba9d6e7783c91c00b";

    async function fetchMovies(query) {
        if(!query) return;

        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}`
        )

        const data = await response.json()
        setMovies(data.results || [])
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchMovies(search)
        }, 600)

        return () => clearTimeout(timer)
    }, [search])

    return(
        <div className="page-container">
            <h1 className="page-title">Filmes</h1>

        <div className="search-area">

            <input 
            type="text" 
            placeholder="Pesquisar filme..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />

            <button className="search-btn" onClick={() => fetchMovies(search)}>Buscar</button>
        </div>

            <div className="grid-movies">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
                        alt={movie.title} />
                    <h3>{movie.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    )

}