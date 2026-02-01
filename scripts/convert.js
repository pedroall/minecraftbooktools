export class Book {
    constructor(pages = []) {
        this.pages = pages;
    }
    toJSON() {
        return {
            "author": "unknown",
            "pages": this.pages
        };
    }
}
export async function convert(content) {
    const books = [];
    const words = content.replace(/\n/g, '').split(' ');
    let book = 0;
    let page = 0;
    let data = "";
    words.forEach((word) => {
        if (page > 100) {
            book++;
            page = 0;
        }
        if (!books[book]) {
            if (!books[book]) {
                books[book] = new Book();
            }
        }
        if (data.length + word.length + 1 >= 250) {
            let currentBook = books[book];
            currentBook.pages[page] = data;
            data = word;
            page++;
        }
        else {
            data += (' ' + word);
        }
    });
    return books.map(bks => bks.toJSON());
}
