let books = []
// function Book(title,author,pages,readStatus){
//     this.title=title
//     this.author=author
//     this.pages=pages
//     this.readStatus=readStatus
// }

class Book{
    constructor(title,author,pages,readStatus){
        this.title=title
        this.author=author
        this.pages=pages
        this.readStatus=readStatus
    }
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
        const readStatusDiv = document.createElement('div')
        const readStatus= document.createElement('p')
        readStatus.textContent=currentBook.readStatus?'read':'not read'
        const checkbox = document.createElement('input')
        checkbox.type='checkbox'
        checkbox.id='check-box'
        checkbox.checked=currentBook.readStatus
        readStatusDiv.classList.add('read-status-div')
        readStatusDiv.append(readStatus,checkbox)
        console.log(currentBook.readStatus)
        readStatusDiv.dataset.index = index
        readStatusDiv.addEventListener('click',(event)=>{
            
            const index = event.target.index

            checkbox.checked?(currentBook.readStatus=false):(currentBook.readStatus=true)
            // checkbox.checked=currentBook.readStatus
            addToDeck()
            
        })
        const removeCardButton = document.createElement('button')
        removeCardButton.textContent='remove'
        removeCardButton.classList.add('remove-button')
        removeCardButton.dataset.index =index
        removeCardButton.addEventListener('click',(event)=>{
            const index = event.target.dataset.index
            books.splice(index,1)
            addToDeck()
        })

        


        card.append(title,author,pagesRead,readStatusDiv,removeCardButton)
        deck.appendChild(card)
        bookDialog.close()
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

const addButton = document.querySelector('.new-book')
const bookDialog = document.querySelector('#book-dialog')
const closeButton = document.querySelector('#close-dialog')
addButton.addEventListener('click',()=>{
    bookDialog.showModal()

})


closeButton.addEventListener('click',()=>{
    bookDialog.close()
})



