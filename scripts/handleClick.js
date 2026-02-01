import { parse } from "./parsers/parse.js";
import { convert } from "./convert.js";
export function handleClick() {
    const button = document.getElementById('convertor');
    button.addEventListener('click', async () => {
        const input = document.getElementById('bookfile');
        const files = input.files;
        if (!files) {
            alert('No file selected.');
            return;
        }
        const file = files.item(0);
        if (!file) {
            alert('No file selected.');
            return;
        }
        const parsedText = await parse(file);
        const books = await convert(parsedText);
        const div = document.getElementById('books');
        books.forEach((book, index) => {
            const blob = new Blob([JSON.stringify(book)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const downloadFilename = `${file.name.replace(/\.[^.]+$/, "")}_${index}.json`;
            a.download = downloadFilename;
            a.innerText = `Download ${downloadFilename}`;
            const br = document.createElement('br');
            div.appendChild(a);
            div.appendChild(br);
        });
    });
}
