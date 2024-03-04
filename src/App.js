import { Route, Routes } from 'react-router';
import './App.css';
import { InorganicaPage } from './pages/InorganicaPage';
import { OrganicaPage } from './pages/OrganicaPage';
import { ExercicisPage } from './pages/ExercicisPage';
import { useEffect, useState } from 'react';

function App() {
    const [darkMode, setDarkMode] = useState(true)

    useEffect(() => {
        if (!darkMode) {
            console.log("aquii")
            document.querySelector(".App").style.filter = "invert(100%) hue-rotate(180deg)"
            let css = document.createElement("style")
            css.innerHTML = `
                .light_theme {
                    filter: invert(100%) hue-rotate(180deg);
                }
            `
            document.head.appendChild(css)
        } else {
            document.querySelector(".App").style.filter = ""
            let css = document.createElement("style")
            css.innerHTML = `
                .light_theme {
                    filter: invert(0%)
                }
            `
            document.head.appendChild(css)
        }
    }, [darkMode])

    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<InorganicaPage setDarkMode={setDarkMode} />} />
                <Route path='/inorganica' element={<InorganicaPage />} setDarkMode={setDarkMode} />
                <Route path='/organica' element={<OrganicaPage />} />
                <Route path='/exercicis' element={<ExercicisPage />} />
            </Routes>
        </div>
    );
}

export default App;
