import jsPDF from 'jspdf';
import axios from 'axios';

var doc = '';

export const RelatorioIrmaos = () => {
    const listaIrmaos = async () => {
        const cabecalho = () => {
            doc.setFont('Courier', 'bold');
            doc.setFontSize(16);
            const text = 'RELATÓRIO DE IRMÃOS';
            doc.text(text, 15, 20);
            const textWidth = doc.getTextWidth(text);
            doc.line(15, 22, 15 + textWidth, 22)
            doc.setFontSize(14);

            doc.text('Cód', 15, 40);
            doc.text('Nome', 45, 40);
            doc.text('Telefone', 223, 40);

            doc.setFontSize(12);
            doc.setFont('Courier', 'normal');
            doc.text('-------------------------------------------------------------------------------', 10, 45);
        };

        const rodape = (numeroPagina, quantidadePaginas) => {
            doc.text('-------------------------------------------------------------------------------', 10, 610);
            doc.text('Pág.: ' + numeroPagina + '/' + quantidadePaginas, 387, 617);
        };

        const baseURL = 'https://api-biblioteca-estrela.vercel.app/listarirmaos';

        await axios.get(baseURL)
            .then((resposta) => {
                doc = new jsPDF({ 
                    orientation: "p",
                    unit: "px",
                    format: "a4"
                });
                
                cabecalho();
                var quantidadeIrmaosTotal = (resposta.data.length);
                var quantidadeIrmaosPagina = 56;
                var quantidadePaginas = Math.ceil(quantidadeIrmaosTotal / quantidadeIrmaosPagina);
                var numeroLinha = 53;
                var numeroPagina = 1;
                var numeroIrmaoPagina = 1;
                var indice = 0;
                while (numeroPagina <= quantidadePaginas) {
                    while (numeroIrmaoPagina <= quantidadeIrmaosPagina) {
                        if (indice < quantidadeIrmaosTotal) {

                            doc.text(resposta.data[indice].id.toString().padStart(4, ' '), 12, numeroLinha);
                            doc.text(resposta.data[indice].nome.slice(0, 33), 45, numeroLinha);
                            doc.text(resposta.data[indice].telefone.slice(0, 28), 222, numeroLinha);

                            indice++;
                            numeroLinha = numeroLinha + 10;
                        };
                        numeroIrmaoPagina++;
                    };
                    rodape(numeroPagina, quantidadePaginas);
                    numeroPagina++;
                    if (numeroPagina <= quantidadePaginas) {
                        doc.addPage()
                        cabecalho();
                        numeroIrmao = 53;
                        numeroIrmaoPagina = 1;
                    };
                };
                window.open(doc.output('bloburl'), '_self');
            })
            .catch(() => console.log('Erro ao Listar os Irmãos'));
    };

    listaIrmaos();
};