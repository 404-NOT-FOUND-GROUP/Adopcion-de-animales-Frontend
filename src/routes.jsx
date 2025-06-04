import { Register } from "./components/Register"
import { Login } from "./components/Login";
import { ContraseñaOlvidada } from "./components/ContraseñaOlvidada"
import { ActualizaContraseña } from "./components/ActualizaContraseña";

export const routes = [
    {path: '/login', element: <Login/>},
    {path: '/register', element: <Register/>},
    {path: '/olvido', element: <ContraseñaOlvidada/>},
    {path: '/actualiza', element: <ActualizaContraseña/>},
    
    
]