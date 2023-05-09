import jsPDF from 'jspdf';
import axios from 'axios';

var doc = '';

export const RelatorioEmprestimos = () => {
    const listaEmprestimos = async () => {
        const cabecalho = () => {
            doc.setFont('Courier', 'bold');
            doc.setFontSize(16);
            const text = 'RELATÓRIO DE EMPRÉSTIMOS';
            doc.text(text, 15, 20);
            const textWidth = doc.getTextWidth(text);
            doc.line(15, 22, 15 + textWidth, 22)
            doc.setFontSize(14);

            doc.text('Nome do Irmão', 10, 40);
            doc.text('Titulo do Livro', 155, 40);
            doc.text('Data Emp', 300, 40);
            doc.text('Data Dev', 362, 40);
            doc.text('DV', 423, 40);

            doc.setFontSize(12);
            doc.setFont('Courier', 'normal');
            doc.text('-------------------------------------------------------------------------------', 10, 45);
        };

        const rodape = (numeroPagina, quantidadePaginas) => {
            doc.text('-------------------------------------------------------------------------------', 10, 610);
            doc.text('Pág.: ' + numeroPagina + '/' + quantidadePaginas, 387, 617);
        };

        const baseURL = 'https://api-biblioteca-estrela.vercel.app/listaremprestimos';

        await axios.get(baseURL)
            .then((resposta) => {
                doc = new jsPDF({ 
                    orientation: "p",
                    unit: "px",
                    format: "a4"
                });
                cabecalho();
                var quantidadeEmprestimosTotal = (resposta.data.length);
                var quantidadeEmprestimosPagina = 56;
                var quantidadePaginas = Math.ceil(quantidadeEmprestimosTotal / quantidadeEmprestimosPagina);
                var numeroLinha = 53;
                var numeroPagina = 1;
                var numeroEmprestimosPagina = 1;
                var indice = 0;
                while (numeroPagina <= quantidadePaginas) {
                    while (numeroEmprestimosPagina <= quantidadeEmprestimosPagina) {
                        if (indice < quantidadeEmprestimosTotal) {

                            doc.text(resposta.data[indice].nome_irmao.slice(0, 25), 10, numeroLinha);
                            doc.text(resposta.data[indice].titulo_livro.slice(0, 25), 155, numeroLinha);
                            doc.text(resposta.data[indice].data_emprestimo.slice(0, 10), 300, numeroLinha);
                            doc.text(resposta.data[indice].data_devolucao.slice(0, 10), 362, numeroLinha);
                            doc.text(resposta.data[indice].devolvido.toString(), 430, numeroLinha);

                            indice++;
                            numeroLinha = numeroLinha + 10;
                        };
                        numeroEmprestimosPagina++;
                    };
                    rodape(numeroPagina, quantidadePaginas);
                    numeroPagina++;
                    if (numeroPagina <= quantidadePaginas) {
                        doc.addPage()
                        cabecalho();
                        numeroEmprestimos = 53;
                        numeroEmprestimosPagina = 1;
                    };
                };
                window.open(doc.output('bloburl'), '_self');
            })
            .catch(() => console.log('Erro ao Listar os Empréstimos'));
    };

    listaEmprestimos();
};