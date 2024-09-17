let books = []
function Book(title,author,pages,readStatus){
    this.title=title
    this.author=author
    this.pages=pages
    this.readStatus=readStatus
}

const deck = document.querySelector('.deck')



function addBook(title,author,pages,readStatus){
    let newBook = new Book(title,author,pages,readStatus)
    books.push(newBook)
}

function addToDeck(){

    deck.innerHTML=''

    books.forEach((currentBook,index)=>{
        const card = document.createElement('div')
        card.classList.add('card')

        const title = document.createElement('h3')
        title.textContent= currentBook.title
        const author = document.createElement('p')
        author.textContent=currentBook.author
        const pagesRead = document.createElement('p')
        pagesRead.textContent=currentBook.pages
        const readStatus= document.createElement('p')
        readStatus.textContent=currentBook.readStatus?'read':'not read'
        console.log(currentBook.readStatus)
        const removeCardButton = document.createElement('button')
        removeCardButton.textContent='remove'
        removeCardButton.classList.add('remove-button')
        removeCardButton.dataset.index =index
        removeCardButton.addEventListener('click',(event)=>{
            const index = event.target.dataset.index
            books.splice(index,1)
            addToDeck()
        })

        card.append(title,author,pagesRead,readStatus,removeCardButton)
        deck.appendChild(card)
    })


}

const addToLibButton = document.querySelector('#confirm-button')

addToLibButton.addEventListener('click',(event)=>{
    const title = document.querySelector('#title').value 
    const author = document.querySelector('#author').value
    const pagesRead = document.querySelector('#pages').value
    const readStatus = document.querySelector('#read-status').checked

    addBook(title,author,pagesRead,readStatus)
    console.log(books)
    addToDeck()

    // console.log(title)
    event.preventDefault()
})


// const removefromLibButton = document.querySelector('.remove-button')



