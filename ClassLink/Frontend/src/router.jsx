import { createBrowserRouter } from "react-router-dom"
import Registrer from "./Components/Registrer"
import Login from "./Components/Login"
import App from "./App"
import PrivatRouter from "./Components/PrivatRouter"

export const router = createBrowserRouter([
    {path: "/", element: <App />},
    {path: "/Registrer", element: <Registrer />},
    {path: "/login", element: <Login />}
    
])
//{path: "/frontpage", element:<PrivatRouter><App /></PrivatRouter>},