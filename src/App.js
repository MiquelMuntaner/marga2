import { Route, Routes } from 'react-router';
import './App.css';
import { InorganicaPage } from './pages/InorganicaPage';
import { OrganicaPage } from './pages/OrganicaPage';
import { ExercicisPage } from './pages/ExercicisPage';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<InorganicaPage />} />
                <Route path='/inorganica' element={<InorganicaPage />} />
                <Route path='/organica' element={<OrganicaPage />} />
                <Route path='/exercicis' element={<ExercicisPage />} />
            </Routes>
        </div>
    );
}

export default App;
