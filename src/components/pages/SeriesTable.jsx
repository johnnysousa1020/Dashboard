import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Series from "./Series";
import "../styles/MoviesTable.css"

export default function SeriesTable(){
    const [series, setSeries] = useState([]);
    const API_KEY = "c76bad2263fc16cba9d6e7783c91c00b";

    useEffect(() => {
        async function loadSeries() {
            try{
    const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=pt-BR&page=1`)
            const data = await response.json()
            setSeries(data.results)
            }catch(error){
                console.error("Erro ao buscar Series:", error)
            }
        }

        loadSeries()
    }, [])

    return(
        <div className="movies-container">
            <h1>Séries Populares</h1>

            <Link to="/dashboard" className="back-btn-vooltar">🡄 Voltar ao Dashboard</Link>

            <Series />

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
                    {series.map((tv) => (
                        <tr key={tv.id}>
                            <td>
                                <img 
                                src={`https://image.tmdb.org/t/p/w92${tv.poster_path}`}
                                alt={tv.name} 
                                className="poster-img"/>
                            </td>

                            <td>{tv.name}</td>
                            <td>{tv.first_air_date}</td>
                            <td>{tv.vote_average.toFixed(1)}</td>
                            <td>{tv.popularity.toFixed(0)}</td>

                            <td>
                                <Link to={`/series/${tv.id}`}>
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