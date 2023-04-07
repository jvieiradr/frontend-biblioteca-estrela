import { useNavigate } from 'react-router-dom';
import './Basico.css';
import './Menu.css';

const Menu = () => {
    const irPara = useNavigate();

    return(
        <>
        <div className="container-menu">
            <button className="button-menu" onClick={() => irPara('/livros')}>Cadastrar Livros</button>
            <button className="button-menu" onClick={() => irPara('/irmaos')}>Cadastrar Irmãos</button>
        </div>
        </>
    )

};

export default Menu;