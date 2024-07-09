import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ProtectedRoute(props: any) {
    const [authed, setAuthed] = useState<boolean>(true);
    const location = useLocation();
      
    // Decode the JWT
    const decodeJWT = (token: string | null) => {
        if (token === null) { return null; }
        try {
          return jwtDecode(token as string);
        } catch (e) {
          return null;
        }
    }
      

    useEffect(() => {
        const token = decodeJWT(sessionStorage.getItem("token"));
        if (!token) {
            setAuthed(false);
            return;
        }
        setAuthed(true);
    }, [])

    return (
        <>
        {
            authed ? 
            props.element : 
            <Navigate to="/signin" state={{from: location}} replace />
        }
        </>
    )
}