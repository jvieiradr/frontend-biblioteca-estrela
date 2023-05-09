import jsPDF from 'jspdf';
import axios from 'axios';

var doc = new jsPDF({ 
    orientation: "p",
    unit: "px",
    format: "a4"
});

export const RelatorioLivros = () => {
    const listaLivros = async () => {
        const cabecalho = () => {
            doc.setFont('Courier', 'bold');
            doc.setFontSize(16);
            const text = 'RELATÓRIO DE LIVROS';
            doc.text(text, 15, 20);
            const textWidth = doc.getTextWidth(text);
            doc.line(15, 22, 15 + textWidth, 22)
            doc.setFontSize(14);
            doc.text('Cód', 18, 40);
            doc.text('Título', 50, 40);
            doc.text('Autor', 239, 40);
            doc.text('Ano', 416, 40);
            doc.setFontSize(12);
            doc.setFont('Courier', 'normal');
            doc.text('-------------------------------------------------------------------------------', 10, 45);
        };

        const rodape = (numeroPagina, quantidadePaginas) => {
            doc.text('-------------------------------------------------------------------------------', 10, 610);
            doc.text('Pág.: ' + numeroPagina + '/' + quantidadePaginas, 387, 617);
        };

        const baseURL = 'https://api-biblioteca-estrela.vercel.app/listarlivros';

        await axios.get(baseURL)
            .then((resposta) => {
                cabecalho();
                var quantidadeLivrosTotal = (resposta.data.length);
                var quantidadeLivrosPagina = 56;
                var quantidadePaginas = Math.ceil(quantidadeLivrosTotal / quantidadeLivrosPagina);
                var numeroLinha = 53;
                var numeroPagina = 1;
                var numeroLivroPagina = 1;
                var indice = 0;
                while (numeroPagina <= quantidadePaginas) {
                    while (numeroLivroPagina <= quantidadeLivrosPagina) {
                        if (indice < quantidadeLivrosTotal) {
                            doc.text(resposta.data[indice].id.toString().padStart(4, ' '), 15, numeroLinha);
                            doc.text(resposta.data[indice].titulo.slice(0, 33), 50, numeroLinha);
                            doc.text(resposta.data[indice].autor.slice(0, 33), 239, numeroLinha);
                            doc.text(resposta.data[indice].ano.toString().padStart(4, ' '), 414, numeroLinha);
                            indice++;
                            numeroLinha = numeroLinha + 10;
                        };
                        numeroLivroPagina++;
                    };
                    rodape(numeroPagina, quantidadePaginas);
                    numeroPagina++;
                    if (numeroPagina <= quantidadePaginas) {
                        doc.addPage()
                        cabecalho();
                        numeroLinha = 53;
                        numeroLivroPagina = 1;
                    };
                };
                location.reload(true);
                window.open(doc.output('bloburl'), '_self');
            })
            .catch(() => console.log('Erro ao Listar os Livros'));
    };

    listaLivros();
};