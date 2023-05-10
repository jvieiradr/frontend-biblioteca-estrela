import './Emprestimos.css';
import { formataDataInvertida } from './Utils.jsx';
import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

var nomeIrmao = '';
var tituloLivro = '';
var dataEmprestimo = '';
var dataDevolucao = '';

const Emprestimos = () => {
    useEffect(() => {
        limparCampos();
    });

    const irPara = useNavigate();

    const cadastrarEmprestimo = async () => {
        const inputDataEmprestimo = document.getElementById('input-data-emprestimo');
        dataEmprestimo = inputDataEmprestimo.value;

        const inputDataDevolucao = document.getElementById('input-data-devolucao');
        dataDevolucao = inputDataDevolucao.value;

        const baseURL = 'https://api-biblioteca-estrela.vercel.app/cadastraremprestimo';

        const novoEmprestimo = {
            nomeIrmao: nomeIrmao,
            tituloLivro: tituloLivro,
            dataEmprestimo: dataEmprestimo,
            dataDevolucao: dataDevolucao,
            devolvido: 0
        };

        var avisos = document.getElementById('avisos');
        if(!novoEmprestimo.nomeIrmao ||
           !novoEmprestimo.tituloLivro) {
                avisos.innerHTML = "<h3 style='color: red'>Preencha Todos os Campos !!!</h3>"
           } else {
                await axios.post (baseURL, novoEmprestimo)
                    .then(() => {
                        avisos.innerHTML = "<h3 style='color: green'>Emprestimo Cadastrado com Sucesso</h3>"
                    })
                    .catch(() => avisos.innerHTML = "<h3 style='color: red'>Erro ao Cadastrar o Empréstimo</h3>");
            };
        setTimeout(() => limparCampos(), 2000);    
    };

    const limparCampos = () => {
        var inputNomeIrmao = document.getElementById('nome-irmao');
        inputNomeIrmao.value = '';
        var listaIrmaos = document.getElementById('lista-irmaos');
        limparListaIrmaos(listaIrmaos);
        
        var inputTituloLivro = document.getElementById('titulo-livro');
        inputTituloLivro.value = '';
        var listaLivros = document.getElementById('lista-livros');
        limparListaLivros(listaLivros);
        
        var inputDataEmprestimo = document.getElementById('input-data-emprestimo');
        inputDataEmprestimo.value = formataDataInvertida(new Date());

        var inputDataDevolução = document.getElementById('input-data-devolucao');
        var dataDevolucao = new Date();
        dataDevolucao.setDate(dataDevolucao.getDate() + 30);
        inputDataDevolução.value = formataDataInvertida(dataDevolucao);

        var avisos = document.getElementById('avisos');
        avisos.innerHTML = "<h3></h3>"

        inputNomeIrmao.focus();
    };
    
    const carregaListaIrmaos = async () => {
        var listaIrmaos = document.getElementById('lista-irmaos');
        limparListaIrmaos(listaIrmaos);

        var iniciais = document.getElementById('nome-irmao').value;
        if (iniciais == '') {iniciais = '*'};

        const baseURL = 'https://api-biblioteca-estrela.vercel.app/buscarirmaos/';
        
        await axios.get(baseURL + iniciais)
            .then((resposta) => {
                if (resposta.data.length !== 0) {
                    resposta.data.forEach((irmao) => {
                        var item = document.createElement('option');
                        item.value = irmao.id;
                        item.text = irmao.nome;
                        listaIrmaos.add(item);
                    });
                listaIrmaos.disabled = false;
                };
            })
            .catch(() => console.log('Erro ao Buscar os Irmãos.'));
    };

    const carregaListaLivros = async () => {
        var listaLivros = document.getElementById('lista-livros');
        limparListaLivros(listaLivros);

        var iniciais = document.getElementById('titulo-livro').value;
        if (iniciais == '') {iniciais = '*'};

        const baseURL = 'https://api-biblioteca-estrela.vercel.app/buscarlivros/';
        
        await axios.get(baseURL + iniciais)
            .then((resposta) => {
                if (resposta.data.length !== 0) {
                    resposta.data.forEach((livro) => {
                        var item = document.createElement('option');
                        item.value = livro.id;
                        item.text = livro.titulo;
                        listaLivros.add(item);
                    });
                listaLivros.disabled = false;
                };
            })
            .catch(() => console.log('Erro ao Buscar os Livros.'));
    };

    const limparListaIrmaos = (listaIrmaos) => {
        var quantidadeIrmaos = listaIrmaos.options.length;
        if (quantidadeIrmaos > 0) {
            for (var i = 0; i < quantidadeIrmaos; i++) {
                listaIrmaos.options.remove(0);
            };
        };
    };

    const limparListaLivros = (listaLivros) => {
        var quantidadeLivros = listaLivros.options.length;
        if (quantidadeLivros > 0) {
            for (var i = 0; i < quantidadeLivros; i++) {
                listaLivros.options.remove(0);
            };
        };
    };

    const selecionaIrmao = () => {
        const inputNomeIrmao = document.getElementById('nome-irmao');
        const selectNomeIrmao = document.getElementById('lista-irmaos');
        inputNomeIrmao.value = selectNomeIrmao.options[selectNomeIrmao.selectedIndex].text;
        nomeIrmao = selectNomeIrmao.options[selectNomeIrmao.selectedIndex].text;
        const inputTituloLivro = document.getElementById('titulo-livro');
        inputTituloLivro.focus();
    };

    const selecionaLivro = () => {
        const inputTituloLivro = document.getElementById('titulo-livro');
        const selectTituloLivro = document.getElementById('lista-livros');
        inputTituloLivro.value = selectTituloLivro.options[selectTituloLivro.selectedIndex].text;
        tituloLivro = selectTituloLivro.options[selectTituloLivro.selectedIndex].text;
        const inputDataEmprestimo = document.getElementById('input-data-emprestimo');
        inputDataEmprestimo.focus();
    };

    return(
      <>
            <div className="container-emprestimos">
                <div id="itens-emprestimo" className="itens-emprestimo">
                    <div id="irmao" className="irmao-livro-emprestimo">
                        <label>Irmão</label>
                        <input id="nome-irmao" size="30" autoFocus onFocus={() => carregaListaIrmaos()} onChange={() => carregaListaIrmaos()} />
                        <select id="lista-irmaos" size="5" disabled onChange={() => selecionaIrmao()}>
                        </select>
                    </div>
                    <div id="livro" className="irmao-livro-emprestimo">
                        <label>Livro</label>
                        <input id="titulo-livro" size="30" onFocus={() => carregaListaLivros()} onChange={() => carregaListaLivros()} />
                        <select id="lista-livros" size="5" disabled onChange={() => selecionaLivro()}>
                        </select>
                    </div>
                </div>

                <div id="datas-emprestimo" className="datas-emprestimo">
                    <div id="data-emprestimo" className="itens-datas-emprestimo">
                        <label>Data do Empréstimo</label>
                        <input type="date" id="input-data-emprestimo"></input>
                    </div>
                    <div id="data-devolucao" className="itens-datas-emprestimo">
                        <label>Data da Devolução</label>
                        <input type="date" id="input-data-devolucao"></input>
                    </div>
                </div>
                <div id="botoes-controle-emprestimo" className="botoes-controle-emprestimo">
                        <button className="botao-controle" onClick={() => cadastrarEmprestimo()}>Salvar</button>
                        <button className="botao-controle" onClick={() => limparCampos()}>Limpar Campos</button>
                        <button className="botao-controle" onClick={() => irPara('/')}>Voltar</button>
                </div>
                <div id="avisos" className="avisos">
                </div>
            </div>
      </>
    )
};

export default Emprestimos;