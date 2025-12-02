// import { useAuthState } from "react-firebase-hooks/auth"
import { Navigate } from "react-router-dom";
import { auth } from "./services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }){
    const [user, setUser] = useState(undefined)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })
     return () => unsub()
    }, [])

    if(user === undefined){
        return <p>Carregando...</p>
    }

    if(user === null){
        return <Navigate to="/login" />
    }

    return children
}