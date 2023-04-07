import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Basico.css';

function Irmaos() {
    const [onEdit, setOnEdit] = useState(false);

    const limparCampos = () => {
        document.getElementById('nome').value = '';
        document.getElementById('email').value = '';
        document.getElementById('telefone').value = '';
        document.getElementById('loja').value = '';
        document.getElementById('codigo').value = '';
        document.getElementById('nome').focus();
        setOnEdit(false);
    };

    const irPara = useNavigate();

    const handleCadastrarAlterarIrmao = () => {
        if (!onEdit) {
            CadastrarIrmao();
        } else {
            alert('Alterar');
        };
    };

    const handleAlterarIrmao = () => {
        setOnEdit(true);
    };

    const CadastrarIrmao = () => {
        const novoIrmao = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            loja: document.getElementById('loja').value
        };

        const baseURL = 'https://api-biblioteca-estrela.vercel.app';
        axios.post(baseURL + '/cadastrarirmao', novoIrmao)
            .then()
            .catch(() => alert('Erro ao Cadastrar o Irmão.'));
        limparCampos();
    };

    const ApagarIrmao = () => {
        const id = document.getElementById('codigo').value;
        alert(id);
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
                    <input id="telefone" size="15" />
                </div>
                <div>
                    <label>Loja</label>
                    <input id="loja" size="40" />
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
                    <tr>
                        <td width="32%"></td>
                        <td width="27%"></td>
                        <td width="23%"></td>
                        <td width="8%"></td>
                        <td><button onClick={() => handleAlterarIrmao()}>Editar</button></td>
                        <td><button onClick={() => ApagarIrmao()}>Excluir</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
      </>
    )
};

export default Irmaos;