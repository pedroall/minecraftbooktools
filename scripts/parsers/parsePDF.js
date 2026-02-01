pdfjsLib.GlobalWorkerOptions.workerSrc = '../pdfjs/pdf.worker.mjs';
export async function parsePDF(file) {
    const buffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
    let text = '';
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const content = await page.getTextContent();
        const pageText = content.items.map((item) => item.str).join(' ');
        text += pageText + '\n\n';
    }
    return text;
}
