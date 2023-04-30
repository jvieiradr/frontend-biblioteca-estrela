import './GerenciarEmprestimos.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ChkLivroDevolvido = ({id}) => {
    return(
        <input type="checkbox" id="chkdevolvido" className="chkdevolvido" onClick={() => emprestarLivro(id)} defaultChecked />
    )
};

const ChkLivroEmprestado = ({id}) => {
    return(
        <input type="checkbox" id="chkdevolvido" className="chkdevolvido" onClick={() => devolverLivro(id)} />
    )
};

const emprestarLivro = async (id) => {
    const baseURL = 'https://api-biblioteca-estrela.vercel.app/emprestarlivro';

    await axios.put(baseURL, {id})
        .then()
        .catch(() => alert ('Erro ao Emprestar o Livro.'));
    window.location.reload(true); 
};

const devolverLivro = async (id) => {
    const baseURL = 'https://api-biblioteca-estrela.vercel.app/devolverlivro';

    await axios.put(baseURL, {id})
        .then()
        .catch(() => alert ('Erro ao Devolver o Livro.'));
    window.location.reload(true); 
};

const GerenciarEmprestimos = () => {
    const [emprestimos, setEmprestimos] = useState([]);
    const irPara = useNavigate();

    const listarEmprestimos = () => {
        const baseURL = 'https://api-biblioteca-estrela.vercel.app/listaremprestimos';
        
        axios.get(baseURL)
            .then((resposta) => {
                setEmprestimos(resposta.data);
            })
            .catch(() => alert ('Erro ao Listar os Emprestimos.'));
    };

    useEffect(() => {
        listarEmprestimos();
    });

    const DeletarEmprestimo = async (id) => {
        const baseURL = 'https://api-biblioteca-estrela.vercel.app';

        await axios.delete(baseURL + '/deletaremprestimo/' + id)
            .then()
            .catch(() => alert ('Erro ao Deletar o Emprestimo'));
        window.location.reload(true);
    };

    return(
        <div name="grid-emprestimos">
            <table className="table-emprestimos">
                <thead>
                    <tr>
                        <th>Nome do Irmão</th>
                        <th>Titulo do Livro</th>
                        <th>Dt. Emp.</th>
                        <th>Dt. Dev.</th>
                        <th>Devolvido</th>
                        <th><button onClick={() => irPara('/')}>Voltar</button></th>
                    </tr>
                </thead>
                <tbody>
                    {emprestimos.map((emprestimo, i) => (
                        <tr key={i}>
                            <td width="220px">{emprestimo.nome_irmao}</td>
                            <td width="220px">{emprestimo.titulo_livro}</td>
                            <td width="100px">{emprestimo.data_emprestimo}</td>
                            <td width="100px">{emprestimo.data_devolucao}</td>
                            <td width="90px"className="td-emprestimos">
                                {emprestimo.devolvido == 0 && <ChkLivroEmprestado id={emprestimo.id} />}
                                {emprestimo.devolvido == 1 && <ChkLivroDevolvido id={emprestimo.id} />}
                            </td>
                            <td><button onClick={() => DeletarEmprestimo(emprestimo.id)}>Excluir</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GerenciarEmprestimos;