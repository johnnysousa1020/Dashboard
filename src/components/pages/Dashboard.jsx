import { useState, useEffect } from "react"
import Navbar from "../Navbar"
import Siderbar from "../Sidebar"
import StatsCard from "../StatsCard"
import "../styles/Layout.css"
import "../styles/Dashboard.css"
import { getTotalMovies, getTotalSeries, getPopularMoviesCount, getTodayRelease } from "../services/tmdb"
import { getReleasesLast12Months, getLatestPlaying, getTopRatedMovies, getPopularSeries } from "../services/tmdb"
import { getTopRatedseries, getTrendingWeekly } from "../services/tmdb"

export default function Dashboard(){
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [totalMovies, setTotalMovies] = useState("-")
    const [totalSeries, setTotalSeries] = useState("-")
    const [popularCount, setPopularCount] = useState("-")
    const [todayReleases, setTodayReleases] = useState("-")

    const [releasesChart, setReleasesChart] = useState({ labels: [], values: [] })
    const [latestList, setLatestList] = useState([])
    const [topRated, setTopRated] = useState([])
    const [popularSeries, setPopularSeries] = useState([])
    const [topSeries, setTopSeries] = useState([])
    const [trendingWeekly, setTrendingWeekly] = useState([])

    useEffect(() => {
        async function loadStats() {
            try{
                const [movies, series, popular, today] = await
                Promise.all([
                    getTotalMovies(),
                    getTotalSeries(),
                    getPopularMoviesCount(),
                    getTodayRelease(),
                ])

                setTotalMovies(movies);
                setTotalSeries(series);
                setPopularCount(popular);
                setTodayReleases(today);

                const [releasesData, latest, topRatedMovies, popularTv, topRatedTv, trending] = await
                Promise.all([
                    getReleasesLast12Months(),
                    getLatestPlaying(5),
                    getTopRatedMovies(10),
                    getPopularSeries(10),
                    getTopRatedseries(10),
                    getTrendingWeekly(12),
                ])

                setReleasesChart(releasesData)
                setLatestList(latest)
                setTopRated(topRatedMovies)
                setPopularSeries(popularTv)
                setTopSeries(topRatedTv)
                setTrendingWeekly(trending)

            }catch(err){
                console.error("Erro ao carregar dados da API:", err)
            }
        }

        loadStats();
    }, [])

    const scrollLeft = () => {
        document.getElementById("carouselTrending").scrollBy({
            left: -300,
            behavior: "smooth",
        })
    }

    const scrollRight = () => {
        document.getElementById("carouselTrending").scrollBy({
            left: 300,
            behavior: "smooth",
        })
    }

    return(
        <>
        <Siderbar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)}/>
        <Navbar openSidebar={() => setSidebarOpen(true)}/>

        <main className="dashboard-main">
            <section className="stats-row">
                <StatsCard title="Total de Filmes" value={totalMovies} change={4.9}>🎬</StatsCard>
                <StatsCard title="Total de Séries" value={totalSeries} change={2.1}>📺</StatsCard>
                <StatsCard title="Filmes Populares (Top 20)" value={popularCount} change={1.3}>⭐</StatsCard>
                <StatsCard title="Lançamentos Hoje" value={todayReleases} change={0}>📅</StatsCard>
            </section>

            <section className="card card-chart">
                <h2>Lançamentos nos últimos 12 meses</h2>
                <div className="releases-chart">
                    {releasesChart.labels && releasesChart.labels.length ? (
                        <div className="chart-list">
                            {releasesChart.labels.map((lab, i) => (
                                <div key={lab} className="chart-item">
                                    <div className="chart-label">{lab}</div>
                                    <div className="chart-value">{releasesChart.values[i]}</div>
                                </div>
                            ))}
                        </div>
                        ) : (
                            <p>Carregando lançamentos...</p>
                    )}
                </div>
            </section>

            <section className="two-columns">
                <div className="card small">
                    <h3>Últimos Lançamentos</h3>
                    {latestList.length ? (
                        <ul className="list-compact">
                            {latestList.map((m) => (
                                <li key={m.id} className="list-item">
                                    <img 
                    src={m.poster_path ? `https://image.tmdb.org/t/p/w92${m.poster_path}` : "/no-image.png"
                                    } alt={m.title} />
                                    <div>
                                        <div className="title">{m.title}</div>
                                        <div className="meta">{m.release_date} ⭐ {m.vote_average}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Carregando...</p>
                    )}
                </div>

                <div className="card small">
                    <h3>Filmes Melhor Avaliados</h3>
                    {topRated.length ? (
                        <ol className="list-ranked">
                            {topRated.map((m) => (
                                <li key={m.id}>
                                    <div className="rank-title">{m.title}
                                        <span className="rank-score">⭐ {m.vote_average}</span>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <p>Carregando...</p>
                    )}
                </div>
            </section>

            <section className="card">
                <h3>Séries Populares</h3>
                <div className="series-row">
                    {popularSeries.length ? (
                        popularSeries.map((s) => (
                            <div key={s.id} className="series-card">
                                <img 
                    src={s.poster_path ? `https://image.tmdb.org/t/p/w154${s.poster_path}` : "/no-image.png"} 
                    alt={s.name} />
                            <div className="series-name">{s.name}</div>
                            </div>
                        ))
                    ) : (
                        <p>Carregando séries...</p>
                    )}
                </div>
            </section>

            <section className="card">
                <h3>Séries Mais Bem Avaliados</h3>
                <div className="series-row">
                    {topSeries.length ? (
                        topSeries.map((s) => (
                            <div key={s.id} className="series-card">
                                <img 
                    src={s.poster_path ? `https://image.tmdb.org/t/p/w154${s.poster_path}` : "/no-image.png"} 
                    alt={s.name} />
                            <div className="series-name">{s.name}
                            <div className="rank-score-main">⭐ {s.vote_average}</div>
                            </div>
                            </div>
                        ))
                    ) : (
                        <p>Carregando séries...</p>
                    )}
                </div>
            </section>

            <section className="card">
                <h3>Em Alta na Semana</h3>
                <div className="carousel-container">
                    <button className="carousel-btn left" onClick={scrollLeft}>🡄</button>
                <div className="carousel-track" id="carouselTrending">
                    {trendingWeekly.length ? (
                        trendingWeekly.map((item) => (
                            <div key={item.id} className="carousel-card">
                                <img 
                    src={item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : "/no-image.png"} 
                    alt={item.title || item.name} />
                            <p className="carousel-title">
                                {item.title || item.name}
                            </p>
                            </div>
                        ))
                    ) : (
                        <p>Carregando...</p>
                    )}
                </div>

                   <button className="carousel-btn right" onClick={scrollRight}>🡆</button>
                </div>
            </section>
        
        </main>
        </>
    )
}