import { Route, Routes } from 'react-router';
import './App.css';
import { InorganicaPage } from './pages/InorganicaPage';
import { OrganicaPage } from './pages/OrganicaPage';
import { ExercicisPage } from './pages/ExercicisPage';
import { IniciPage } from './pages/IniciPage';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { InformacioPage } from './pages/InformacioPage';
import CacheBuster from 'react-cache-buster'
import PageTitle from './components/PageTitle';
/*
import { ReactGAImplementation } from 'react-ga4';


ReactGAImplementation.initialize(TRACKING_ID)

*/
function App() {
    const [darkMode, setDarkMode] = useState(true)
    const isProduction = process.env.NODE_ENV === 'production';

    const theme = {
        bg: "#F2F3F4",
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
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path='/' element={(
                        <>
                            <PageTitle title="Nocions - Inici" />
                            <IniciPage setDarkMode={setDarkMode} />
                        </>
                    )} />
                    <Route path='/inorganica' element={
                        <>
                            <PageTitle title="Nocions - Inorgànica" />
                            <InorganicaPage setDarkMode={setDarkMode} />
                        </>
                    } />
                    <Route path='/organica' element={
                        <>
                            <PageTitle title="Nocions - Orgànica" />
                            <OrganicaPage setDarkMode={setDarkMode} />
                        </>}
                    />
                    <Route path='/exercicis' element={<ExercicisPage setDarkMode={setDarkMode} />} />
                    <Route path='/informacio' element={
                        <>
                            <PageTitle title="Nocions - Informació" />
                            <InformacioPage setDarkMode={setDarkMode} />
                        </>
                    } />
                </Routes>
            </ThemeProvider>
        </div>
    );
}

export default App;
