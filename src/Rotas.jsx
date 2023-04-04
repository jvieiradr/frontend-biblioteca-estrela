import { Routes, Route } from 'react-router-dom';
import Menu from './Menu.jsx';
import Livros from './Livros.jsx';

const Rotas = () => {
    return(
        <>
            <Routes>
                <Route path='/' exact element={<Menu />} />
                <Route path='/livros' element={<Livros />} />
            </Routes>
        </>
    )
}

export default Rotas;