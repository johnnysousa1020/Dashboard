import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Moviesdetails.css"

export default function MovieDetails(){
    const { id } = useParams();
    const [movie, setMovie] = useState(null)
    const API_KEY = "c76bad2263fc16cba9d6e7783c91c00b";

    useEffect(() => {
        async function loadMovie() {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`
            )
            const data = await response.json()
            setMovie(data)
        }
        loadMovie()
    }, [id])

    if(!movie) return <p>Carregando...</p>

    return(
        <div className="details-container">
            <Link to="/dashboard/moviestable" className="btn-back">Voltar</Link>
                  
            <h1>{movie.title}</h1>

            <div className="details-content">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title} />

                <div className="details-info">
                    <p><strong>Descrição:</strong> {movie.overview}</p>
                    <p><strong>Genero:</strong> {movie.genres.map(g => g.name).join(", ")}</p>
                    <p><strong>Nota:</strong> {movie.vote_average}</p>
                    <p><strong>Popularidade:</strong> {movie.popularity}</p>
                    <p><strong>Lançamento:</strong> {movie.release_date}</p>
                    <p><strong>Duração:</strong> {movie.runtime} min</p>
                </div>
            </div>
        </div>
    )
}