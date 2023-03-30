import '../Components/Grid.css';
import axios from 'axios';

function Grid({livros, getLivros, setOnEdit}) {

    const handleEditar = (livro) => {
        document.getElementById('titulo').value = livro.titulo;
        document.getElementById('autor').value = livro.autor;
        document.getElementById('editora').value = livro.editora;
        document.getElementById('ano').value = livro.ano;
        document.getElementById('codigo').value = livro.id;
        setOnEdit(livro);
    };

    const handleDelete = async(id) => {
        const baseURL = 'https://api-biblioteca-estrela.vercel.app';
        await axios.delete(baseURL + '/deletar/' + id)
            .then(() => alert('Livro Deletado com Sucesso !!!'))
            .catch(() => alert('Erro ao Deletar o Livro.'));
        getLivros();
        document.getElementById('titulo').focus();
    };

    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Autor</th>
                    <th>Editora</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {livros.map((livro, i) => (
                <tr key={i}>
                    <td width="30%">{livro.titulo}</td>
                    <td width="30%">{livro.autor}</td>
                    <td width="30%">{livro.editora}</td>
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