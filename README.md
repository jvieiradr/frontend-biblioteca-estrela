para se criar um projeto react utiliza-se o Vite
- digitar npm create vite@latest reactapp --template react
- criar o nodemodules digitando: npm install
- para executar o projeto basta digitar: npm run dev

Voce pode limpar todo o projeto deixando o basico: Deixa somente o app e o home. Cria uma pasta chamada pages
joga o app la dentro e renomeia para home. Depois arruma as importações e referencias ao home.

O retorno da função do home deve ser de apenas um elemento, então vc deve usar o fragment <> outros elementos </> ou
<div> outros elementos </div>

Para importar um arquivo CSS basta inserir: import './styles/arquivo.css'

- Sempre que vc importar uma pasta e dentro dela existir um arquivo chamado index.jsx ele será chamado sem a necessidade
de especificá-lo.

* Importante separar as paginas em pastas separadas, assim cada pagina terá seu style.css próprio.

* Ao definir uma class no react deve-se colocar className.

* Para instalar fontes externas ao projeto utilizar o Google Fonts.

* Componentização é a técnica de se criar componentes e re-usalos.

* Para passar uma propriedade para o componente usa-se: <componente propriedade="valor" />
	No componente coloca-se entre parenteses (props) e no local onde se quer colocar usa {props.propriedade}

* Ao se usar dentro do input um onChange={e => e.target.value} ele pega o valor toda vez que digita-se alguma coisa.

* Quando se deseja usar uma variavel coloca-se ela entre {}.

* Diferença entre uma variavel e um estado: A variavel não reflete na DOM o estado reflete assim que se altera seu valor.

* Para criar um estado, primeito usa um import: "import React, { useState } from 'react';"
	Depois define ele assim: "const [studentName, setStudentName] = useState();"
	O primeiro parametro é o estado em si com o valor e o segundo é a função que atribui valor a ele.
	Dentro do useState() pode-se definir um valor inicial.

* Pela imutabilidade não se deve alterar algum elemento e sim cria-lo por inteiro, por exemplo, não se altera um vetor e
	sim recria-se ele por inteiro novamente para exibi-lo.

* Quando se cria uma estrutura repetição de elementos deve-se criar uma Key Prop, ou seja, uma chave para cada elemento 
	da lista. Essa chave deve ser unica.

* O useEffect é sempre executado toda vez que a tela é reinderizada.