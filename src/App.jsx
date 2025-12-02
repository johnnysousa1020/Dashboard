import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/pages/Login"
import Dashboard from "./components/pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import MoviesTable from "./components/pages/MoviesTable"
import SeriesTable from "./components/pages/SeriesTable"
import SeriesDetails from "./components/pages/SeriesDetails"
import MovieDetails from "./components/pages/MovieDetails"
import Movies from "./components/pages/Movies"
import Series from "./components/pages/Series"
import "./App.css"

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
        />   

        <Route 
          path="/dashboard/moviestable" element={<MoviesTable />}
        /> 

        <Route 
          path="/dashboard/seriestable" element={<SeriesTable />}
        /> 

        <Route 
          path="/series/:id" element={
            <ProtectedRoute>
              <SeriesDetails />
            </ProtectedRoute>
          }
        /> 

        <Route 
          path="/movie/:id" element={
            <ProtectedRoute>
              <MovieDetails />
            </ProtectedRoute>
          }
        /> 

        <Route 
          path="/movies" element={
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          }
        /> 

        <Route 
          path="/series" element={
            <ProtectedRoute>
              <Series />
            </ProtectedRoute>
          }
        /> 

        <Route path="/" element={<Navigate to="/" />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
