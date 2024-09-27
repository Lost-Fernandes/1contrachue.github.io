document.getElementById('gerarPdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const margin = 10;

    // Configurações de fonte e tamanho
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    // Título
    doc.text('CONTRACHEQUE', 100, 20, null, null, 'center');

    // Dados da empresa
    doc.rect(margin, 30, 190, 30);
    doc.text(`Empresa: ${document.getElementById('empresa').value}`, margin + 5, 35);
    doc.text(`CNPJ: ${document.getElementById('cnpj').value}`, margin + 5, 45);
    doc.text(`Folha Mensal: ${document.getElementById('folha').value}`, margin + 5, 55);

    // Dados do funcionário
    doc.rect(margin, 70, 190, 40);
    doc.text(`Código: ${document.getElementById('codigo').value}`, margin + 5, 75);
    doc.text(`Nome do Funcionário: ${document.getElementById('nome').value}`, margin + 5, 85);
    doc.text(`Descrição: ${document.getElementById('descricao').value}`, margin + 5, 95);
    doc.text(`Referência: ${document.getElementById('referencia').value}`, margin + 5, 105);

    // Vencimentos
    doc.rect(margin, 120, 190, 30);
    doc.text('Vencimentos:', margin + 5, 125);
    doc.text(`Salário Base: ${document.getElementById('salarioBase').value}`, margin + 5, 135);
    doc.text(`Horas Extras: ${document.getElementById('horasExtras').value}`, margin + 5, 145);

    // Descontos
    doc.rect(margin, 150, 190, 30);
    doc.text('Descontos:', margin + 5, 155);
    doc.text(`INSS: ${document.getElementById('inss').value}`, margin + 5, 165);
    doc.text(`IRRF: ${document.getElementById('irrf').value}`, margin + 5, 175);

    // Totais
    const totalVencimentos = parseFloat(document.getElementById('salarioBase').value.replace('R$ ', '').replace('.', '').replace(',', '.')) + 
                             parseFloat(document.getElementById('horasExtras').value.replace('R$ ', '').replace('.', '').replace(',', '.'));

    const totalDescontos = parseFloat(document.getElementById('inss').value.replace('R$ ', '').replace('.', '').replace(',', '.')) + 
                           parseFloat(document.getElementById('irrf').value.replace('R$ ', '').replace('.', '').replace(',', '.'));

    const liquido = totalVencimentos - totalDescontos;

    doc.rect(margin, 180, 190, 30);
    doc.text(`Total Vencimentos: R$ ${totalVencimentos.toFixed(2)}`, margin + 5, 185);
    doc.text(`Total Descontos: R$ ${totalDescontos.toFixed(2)}`, margin + 5, 195);
    doc.text(`Líquido: R$ ${liquido.toFixed(2)}`, margin + 5, 205);

    // Declaração
    doc.setFontSize(10);
    doc.text('Declaro ter recebido a importância discriminada neste CONTRACHEQUE.', margin, 220);
    doc.text('Data: ________________', margin + 100, 225);
    doc.text('Assinatura do Recebedor: ________________', margin, 235);

    // Salvar o PDF
    doc.save('contracheque.pdf');
});
