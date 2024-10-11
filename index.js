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
        pagesRead.textContent=`${currentBook.pages} pages read`
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
    const titleField = document.querySelector('#title') 

    const pages=document.querySelector('#pages')
    const pagesRead = document.querySelector('#pages').value
    const readStatus = document.querySelector('#read-status').checked
    
    let status = true
    if(titleField.validity.valueMissing){
        document.querySelector('.title-error').textContent='enter the book title '
        document.querySelector('.title-error').classList.replace('valid','invalid')
        status=false
    }
    if(pages.validity.rangeOverflow){
        document.querySelector('.page-error').textContent='enter a realistic amount'
        status = false
        document.querySelector('.page-error').classList.replace('valid','invalid')


    }

    if(pages.validity.valueMissing){
        document.querySelector('.page-error').textContent='please enter a value'
        document.querySelector('.page-error').classList.replace('valid','invalid')
        status = false
    }

    if(status){
        addBook(title,author,pagesRead,readStatus)
        console.log(books)
        addToDeck()
        dialogReset()
    }
        
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

function dialogReset(){
    document.querySelector('#title').value=''
    const invalidFields = document.querySelectorAll('.invalid')
    invalidFields.forEach(field=>{
        field.textContent=''
        field.classList.replace('invalid','valid')
    })
    document.querySelector('#author').value=''
    document.querySelector('#pages').value=''
    document.querySelector('#read-status').checked=false
} 

closeButton.addEventListener('click',()=>{
    bookDialog.close()
})



