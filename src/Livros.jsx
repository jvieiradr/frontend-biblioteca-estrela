import Form from './Components/Form.jsx';
import Grid from './Components/Grid.jsx';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Basico.css';

function Livros() {
  const [livros, setLivros] = useState([]);
  const [onEdit, setOnEdit] = useState([]);

  const getLivros = () => {
//    const baseURL = 'http://localhost:8800';
    const baseURL = 'https://api-biblioteca-estrela.vercel.app/listarlivros';

    axios.get(baseURL)
     .then((resposta) => {
      setLivros(resposta.data)
      })
      .catch(() => console.log('Erro ao Consultar os Livros.'))
  };

  useEffect(() => {
    getLivros();
  });

  return (
    <div>
      <Form getLivros={getLivros} setLivros={setLivros} onEdit={onEdit} setOnEdit={setOnEdit}/>
      <Grid livros={livros} getLivros={getLivros} setLivros = {setLivros} onEdit={onEdit} setOnEdit={setOnEdit}/>
    </div>
  )
};

export default Livros;