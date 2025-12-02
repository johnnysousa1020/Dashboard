import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Movies from "./Movies";
import "../styles/MoviesTable.css"

export default function MoviesTable(){
    const [movies, setMovies] = useState([]);
    const API_KEY = "c76bad2263fc16cba9d6e7783c91c00b";

    useEffect(() => {
        async function loadMovies() {
            try{
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`)
            const data = await response.json()
            setMovies(data.results)
            }catch(error){
                console.error("Erro ao buscar filmes:", error)
            }
        }

        loadMovies()
    }, [])

    return(
        <div className="movies-container">
            <h1>Filmes Populares</h1>

            <Link to="/dashboard" className="back-btn-vooltar">🡄 Voltar ao Dashboard</Link>

            <Movies />

        <div className="table-responsive">
            <table className="movies-table">
                <thead>
                    <tr>
                        <th>Poster</th>
                        <th>Título</th>
                        <th>Data</th>
                        <th>Nota</th>
                        <th>Popularidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.id}>
                            <td>
                                <img 
                                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                alt={movie.title} 
                                className="poster-img"/>
                            </td>

                            <td>{movie.title}</td>
                            <td>{movie.release_date}</td>
                            <td>{movie.vote_average}</td>
                            <td>{movie.popularity.toFixed(0)}</td>

                            <td>
                                <Link to={`/movie/${movie.id}`}>
                                <button className="btn-details">Ver Detalhes</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    )
}