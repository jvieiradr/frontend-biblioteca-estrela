import '../Components/Grid.css';
import axios from 'axios';

function Grid({livros, setLivros, setOnEdit}) {
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

    const handleEditar = (livro) => {
        document.getElementById('titulo').value = livro.titulo;
        document.getElementById('autor').value = livro.autor;
        document.getElementById('editora').value = livro.editora;
        document.getElementById('ano').value = livro.ano;
        document.getElementById('codigo').value = livro.id;
        setOnEdit(livro);
        window.scrollTo(0, 0);
    };

    const handleDelete = async(id) => {
        const baseURL = 'https://api-biblioteca-estrela.vercel.app';
        await axios.delete(baseURL + '/deletarlivro/' + id)
            .then(() => {
                setTimeout(() => alert('Livro Deletado com Sucesso !!!', 2000));
                limparCampos();
            })
            .catch(() => alert('Erro ao Deletar o Livro.'));
    };

    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Autor</th>
                    <th>Editora</th>
                    <th width="8%" className="td-ano">Ano</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {livros.map((livro, i) => (
                <tr key={i}>
                    <td width="32%">{livro.titulo}</td>
                    <td width="27%">{livro.autor}</td>
                    <td width="24%">{livro.editora}</td>
                    <td width="8%" className="td-ano">{livro.ano}</td>
                    <td><button onClick={() => handleEditar(livro)}>Editar</button></td>
                    <td><button onClick={() => handleDelete(livro.id)}>Excluir</button></td>
                </tr>
            ))}    
            </tbody>
        </table>
        </>
    )
};

export default Grid;