const API_KEY = "c76bad2263fc16cba9d6e7783c91c00b";
const BASE_URL = "https://api.themoviedb.org/3";

export async function getTotalMovies() {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`)
    const data = await res.json()
    return data.total_results;
}

export async function getTotalSeries() {
    const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=pt-BR&page=1`)
    const data = await res.json()
    return data.total_results;
}

export async function getPopularMoviesCount() {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`)
    const data = await res.json()
    return data.results.length;
}

export async function getTodayRelease() {
    const currentdate = new Date().toISOString().split("T")[0]

    const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=pt-BR&region=BR`)
    const data = await res.json()
    const todayMovies = data.results.filter((movie) => movie.release_date === currentdate)
    return todayMovies.length
}

async function fetchJson(url) {
    const res = await fetch(url);
    if(!res.ok) throw new Error(`TMDB error ${res.status}`)
    return res.json()
}

export async function getReleasesLast12Months() {
    const today = new Date()
    const end = today.toISOString().slice(0, 10)
                      
    const past = new Date()
    past.setMonth(past.getMonth() - 11)

    const start = new Date(past.getFullYear(), past.getMonth(), 1)
    .toISOString()
    .slice(0, 10)

    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=primary_release_date.desc&primary
    _release_date.gte=${start}&primary_release_date.lte=${end}&page=1`
    const data = await fetchJson(url)

    const results = data.results || []

    const counts = {}

    for (let i = 0; i < 12; i++){
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1)
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
        counts[key] = 0;
    }

    results.forEach((m) => {
        if(!m.release_date) return;
        const d = new Date(m.release_date)
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
        if(counts[key] !== undefined) counts[key] += 1;
    });

    const keys = Object.keys(counts).reverse();

    const labels = keys.map((k) => {
        const [y, mo] = k.split("-")

        return `${mo}/${y}`
    })

    const values = keys.map((k) => counts[k])

    return { labels, values }
}

export async function getLatestPlaying(limit = 5) {
    const url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=pt-BR&page=1`
    const data = await fetchJson(url)
    return (data.results || []).slice(0, limit)
}

export async function getTopRatedMovies(limit = 10) {
    const url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=pt-BR&page=1`
    const data = await fetchJson(url)
    return(data.results || []).slice(0, limit)
}

export async function getPopularSeries(limit = 10) {
    const url = `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=pt-BR&page=1`
    const data = await fetchJson(url)
    return(data.results || []).slice(0, limit)
}

export async function getTopRatedseries(limit = 10) {
    const url = `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=pt-BR&page=1`
    const data = await fetchJson(url)
    return (data.results || []).slice(0, limit)
}

export async function getTrendingWeekly(limit = 10) {
    const url = `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=pt-BR`
    const data = await fetchJson(url)
    return (data.results || []).slice(0, limit)
}
