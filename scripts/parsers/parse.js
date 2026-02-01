import { parseHTML } from "./parseHTML.js";
import { parsePDF } from "./parsePDF.js";
export async function parse(file) {
    const text = await file.text();
    switch (file.type) {
        case 'text/plain':
            return text;
        case 'text/html':
            return parseHTML(text);
        case 'application/pdf':
            return await parsePDF(file);
        default:
            return text;
    }
}
