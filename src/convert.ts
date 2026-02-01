export interface MinecraftBookInterface {
    author: string,
    pages: string[]
}

export class Book {
    constructor(
        public pages: string[] = [],
    ) {
       
    }
    toJSON() {
        return {
            "author": "unknown",
            "pages": this.pages
        }
    }
}

export async function convert(content: string): Promise<MinecraftBookInterface[]> {
    const books: Book[] = []
    const words = content.replace(/\n/g, '').split(' ')
    let book = 0
    let page = 0
    let data = ""

    words.forEach((word) => {
        if(page > 100) {
                book++
                page = 0
        }
        if(!books[book]) {
                if(!books[book]) {
                    books[book] = new Book()
                }
        }
        if( data.length + word.length + 1 >= 250) {
            let currentBook = books[book] as Book

            currentBook.pages[page] = data
            data = word
            page++
        } else {
            data += (' ' + word)
        }
    })

    return books.map(bks => bks.toJSON())
}