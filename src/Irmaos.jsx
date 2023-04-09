import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Basico.css';
import './Utils.jsx';
import { mascaraTelefone } from './Utils.jsx';

function Irmaos() {
    const [irmaos, setIrmaos] = useState([]);
    const [onEdit, setOnEdit] = useState(false);

    const listarIrmaos = () => {
        //    const baseURL = 'http://localhost:8800';
        const baseURL = 'https://api-biblioteca-estrela.vercel.app/listarirmaos';
        
        axios.get(baseURL)
            .then((resposta) => {
                setIrmaos(resposta.data)
                })
            .catch(() => console.log('Erro ao Consultar os Irmãos.'))
    };
        
    useEffect(() => {
        listarIrmaos();
    });

    const limparCampos = () => {
        document.getElementById('nome').value = '';
        document.getElementById('email').value = '';
        document.getElementById('telefone').value = '';
        document.getElementById('loja').value = 'Estrela Noroeste do Brasil';
        document.getElementById('codigo').value = '';
        document.getElementById('nome').focus();
        setOnEdit(false);
    };

    const irPara = useNavigate();

    const handleCadastrarAlterarIrmao = () => {
        if (!onEdit) {
            CadastrarIrmao();
        } else {
            AlterarIrmao();
        };
    };

    const handleAlterarIrmao = (irmao) => {
        document.getElementById('nome').value = irmao.nome;
        document.getElementById('email').value = irmao.email;
        document.getElementById('telefone').value = irmao.telefone;
        document.getElementById('loja').value = irmao.loja;
        document.getElementById('codigo').value = irmao.id;
        document.getElementById('nome').focus();
        setOnEdit(true);
        window.scrollTo(0, 0);
    };

    const AlterarIrmao = async () => {
        const irmaoAlterado = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            loja: document.getElementById('loja').value,
            id: document.getElementById('codigo').value
        };

        const baseURL = 'https://api-biblioteca-estrela.vercel.app';
        await axios.put(baseURL + '/alterarirmao', irmaoAlterado)
            .then()
            .catch(() => alert('Erro ao Alterar o Irmão.'));
        setOnEdit([]);
        listarIrmaos();
        limparCampos();
    };

    const CadastrarIrmao = async () => {
        const novoIrmao = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            loja: document.getElementById('loja').value
        };

        const baseURL = 'https://api-biblioteca-estrela.vercel.app';
        await axios.post(baseURL + '/cadastrarirmao', novoIrmao)
            .then()
            .catch(() => alert('Erro ao Cadastrar o Irmão.'));
        limparCampos();
    };

    const ApagarIrmao = async (id) => {
        const baseURL = 'https://api-biblioteca-estrela.vercel.app';
        await axios.delete(baseURL + '/deletarirmao/' + id)
            .then(() => {
                setTimeout(() => alert('Irmão Deletado com Sucesso !!!', 3000));
            })
            .catch(() => alert('Erro ao Deletar o Irmão.'));
        listarIrmaos();
        limparCampos();
    };

    return (
      <>
        <div id="Form">
            <form>
                <div>
                    <label>Nome</label>
                    <input id="nome" size="40" autoFocus />
                </div>
                <div>
                    <label>E-Mail</label>
                    <input id="email" size="40" />
                </div>
                <div>
                    <label>Telefone</label>
                    <input id="telefone" size="15" onChange={() => mascaraTelefone()}/>
                </div>
                <div>
                    <label>Loja</label>
                    <input id="loja" size="40" defaultValue="Estrela Noroeste do Brasil" />
                </div>

                <button type="button" onClick={() => handleCadastrarAlterarIrmao()}>Salvar</button>

                <div>
                    <label>Código</label>
                    <input id="codigo" size="5" disabled />
                </div>

                <button type="button" onClick={() => limparCampos()}>Limpar</button>
                <button type="button" onClick={() => irPara('/')}>Voltar</button>
            </form>
        </div>

        <div name="Grid">
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-Mail</th>
                        <th>Telefone</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {irmaos.map((irmao, i) => (
                    <tr key={i}>
                        <td width="35%">{irmao.nome}</td>
                        <td width="35%">{irmao.email}</td>
                        <td width="35%">{irmao.telefone}</td>
                        <td><button onClick={() => handleAlterarIrmao(irmao)}>Editar</button></td>
                        <td><button onClick={() => ApagarIrmao(irmao.id)}>Excluir</button></td>
                    </tr>
                ))}    
                </tbody>
            </table>
        </div>
      </>
    )
};

export default Irmaos;