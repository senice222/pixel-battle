import {BrowserRouter, Routes, Route} from "react-router-dom";
import './styles/App.scss'
import Home from "./pages/Home.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
