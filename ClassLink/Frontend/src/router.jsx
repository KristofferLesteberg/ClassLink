import { createBrowserRouter } from "react-router-dom"
import Registrer from "./Components/Registrer"
import Login from "./Components/Login"
import App from "./App"

export const router = createBrowserRouter([
    {path: "/frontpage", element: <App />},
    {path: "/", element: <Registrer />},
    {path: "/login", element: <Login />}
    
])