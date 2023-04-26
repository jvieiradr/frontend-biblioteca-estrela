import { Routes, Route } from 'react-router-dom';
import Menu from './Menu.jsx';
import Livros from './Livros.jsx';
import Irmaos from './Irmaos.jsx';
import Emprestimos from './Emprestimos.jsx';

const Rotas = () => {
    return(
        <>
            <Routes>
                <Route path='/' exact element={<Menu />} />
                <Route path='/livros' element={<Livros />} />
                <Route path='/irmaos' element={<Irmaos />} />
                <Route path='/emprestimos' element={<Emprestimos />} />
            </Routes>
        </>
    )
}

export default Rotas;