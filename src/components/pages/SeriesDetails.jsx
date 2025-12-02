import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Moviesdetails.css"

export default function SeriesDetails(){
    const { id } = useParams();
    const [serie, setSerie] = useState(null)
    const API_KEY = "c76bad2263fc16cba9d6e7783c91c00b";

    useEffect(() => {
        async function loadSerie() {
            const response = await fetch(
                `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=pt-BR`
            )
            const data = await response.json()
            setSerie(data)
        }
        loadSerie()
    }, [id])

    if(!serie) return <p>Carregando...</p>

    return(
        <div className="details-container">
            <Link to="/dashboard/seriestable" className="btn-back">Voltar</Link>

            <h1>{serie.name}</h1>

            <div className="details-content">
                <img src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} 
                alt={serie.name} />

                <div className="details-info">
                    <p><strong>Descrição:</strong> {serie.overview}</p>
                    <p><strong>Genero:</strong> {serie.genres.map(g => g.name).join(", ")}</p>
                    <p><strong>Nota:</strong> {serie.vote_average}</p>
                    <p><strong>Popularidade:</strong> {serie.popularity}</p>
                    <p><strong>Temporadas:</strong> {serie.number_of_seasons}</p>
                    <p><strong>Episódios:</strong> {serie.number_of_episodes}</p>
                </div>
            </div>
        </div>
    )
}