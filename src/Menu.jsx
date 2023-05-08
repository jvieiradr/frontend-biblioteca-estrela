import { useNavigate } from 'react-router-dom';
import { RelatorioLivros } from './RelatorioLivros.jsx';
import { RelatorioIrmaos } from './RelatorioIrmaos.jsx';
import { RelatorioEmprestimos } from './RelatorioEmprestimos.jsx';
import './Basico.css';
import './Menu.css';

const Menu = () => {
    const irPara = useNavigate();

    return(
        <>
        <div className="container-menu">
            <button className="button-menu" onClick={() => irPara('/livros')}>Cadastrar Livros</button>
            <button className="button-menu" onClick={() => RelatorioLivros()}>Relatório de Livros</button>
            <button className="button-menu" onClick={() => irPara('/irmaos')}>Cadastrar Irmãos</button>
            <button className="button-menu" onClick={() => RelatorioIrmaos()}>Relatório de Irmãos</button>
            <button className="button-menu" onClick={() => irPara('/emprestimos')}>Realizar Emprestimo</button>
            <button className="button-menu" onClick={() => irPara('/gerenciaremprestimos')}>Gerenciar Emprestimos</button>
            <button className="button-menu" onClick={() => RelatorioEmprestimos()}>Relatório de Emprestimos</button>
        </div>
        </>
    );
};

export default Menu;