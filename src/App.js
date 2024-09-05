import { Route, Routes } from 'react-router';
import './App.css';
import { InorganicaPage } from './pages/InorganicaPage';
import { OrganicaPage } from './pages/OrganicaPage';
import { ExercicisPage } from './pages/ExercicisPage';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { InformacioPage } from './pages/InformacioPage';
import { GoogleAnalytics } from './components/GoogleAnalytics'
/*
import { ReactGAImplementation } from 'react-ga4';


ReactGAImplementation.initialize(TRACKING_ID)

*/
function App() {
    const [darkMode, setDarkMode] = useState(true)

    const theme = {
        bg: "white",
        text: "#333333",
        // main: "#3E0F4A",
        main: "#3E0F4A",
        secondary: "#007972"
    }

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
            <GoogleAnalytics GA_MEASUREMENT_ID={"G-D1DX631HCE"} />
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path='/' element={<InorganicaPage setDarkMode={setDarkMode} />} />
                    <Route path='/inorganica' element={<InorganicaPage setDarkMode={setDarkMode} />} />
                    <Route path='/organica' element={<OrganicaPage setDarkMode={setDarkMode} />} />
                    <Route path='/exercicis' element={<ExercicisPage setDarkMode={setDarkMode} />} />
                    <Route path='/informacio' element={<InformacioPage setDarkMode={setDarkMode} />} />
                </Routes>
            </ThemeProvider>
        </div>
    );
}

export default App;
