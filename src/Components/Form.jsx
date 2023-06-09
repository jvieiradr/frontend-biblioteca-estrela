import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Components/Form.css';

function Form({getLivros, setLivros, onEdit, setOnEdit}) {
    const irPara = useNavigate();

    const limparCampos = () => {
        document.getElementById('titulo').value = '';
        document.getElementById('autor').value = '';
        document.getElementById('editora').value = '';
        document.getElementById('ano').value = '0';
        document.getElementById('codigo').value = '';
        document.getElementById('titulo').focus();
        setOnEdit([]);
        setLivros([]);
    };

    const handleCadastrarEditarLivro = async () => {
        const baseURL = 'https://api-biblioteca-estrela.vercel.app';

        if (onEdit.length === 0) {
            const livro = {
                titulo: document.getElementById('titulo').value,
                autor: document.getElementById('autor').value,
                editora: document.getElementById('editora').value,
                ano: document.getElementById('ano').value,
            };
    
            if (!livro.titulo ||
                !livro.autor ||
                !livro.editora ||
                !livro.ano) {
                    alert('Preencha todos os Campos !!!');
                    document.getElementById('titulo').focus();
            } else {
                    await axios.post(baseURL + '/cadastrarlivro', livro)
                        .then()
                        .catch(() => alert('Erro ao Cadastrar o Livro.'));
                    limparCampos();
            };
        } else {
            const livro = {
                titulo: document.getElementById('titulo').value,
                autor: document.getElementById('autor').value,
                editora: document.getElementById('editora').value,
                ano: document.getElementById('ano').value,
                id: onEdit.id
            };
    
            if (!livro.titulo ||
                !livro.autor ||
                !livro.editora ||
                !livro.ano) {
                    alert('Preencha todos os Campos !!!');
                    document.getElementById('titulo').focus();
            } else {
                    await axios.put(baseURL + '/alterarlivro', livro)
                    .then()
                    .catch(() => alert('Erro ao Editar o Livro.'));
                    setOnEdit([]);
                    limparCampos();
            };
        }    
    ;}

    return (
        <>
            <form>
                <div>
                    <label>Titulo</label>
                    <input id="titulo" size="45" autoFocus />
                </div>
                <div>
                    <label>Autor</label>
                    <input id="autor" size="45" />
                </div>
                <div>
                    <label>Editora</label>
                    <input id="editora" size="45" />
                </div>
                <div>
                    <label>Ano</label>
                    <input id="ano" size="10" defaultValue="0" />
                </div>

                <button type="button" onClick={() => handleCadastrarEditarLivro()}>Salvar</button>

                <div>
                    <label>Código</label>
                    <input id="codigo" size="5" disabled />
                </div>

                <button type="button" onClick={() => limparCampos()}>Limpar</button>
                <button type="button" onClick={() => irPara('/')}>Voltar</button>
            </form>
        </>    
    )
};

export default Form;