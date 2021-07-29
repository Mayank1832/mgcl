function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}


// function Display() {

// }
class Display{
    constructor(){}
    
    
    
    clear(){
    let libraryForm = document.getElementById('libraryForm')
    libraryForm.reset()  //Rests the form
    }
    
    
    validate(book){
       if (book.name.length < 2 || book.author.length < 2) {
        return false} 
    else {
        return true}
    }
    
    
    
    show(type,displayMessage){
        
    let message = document.getElementById('message')
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                        <strong>Message: </strong> ${displayMessage}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        </div>`;
    
    
    
     setTimeout(function () {message.innerHTML = ''}, 2000);}                    
}
    console.log(message)


Display.prototype.add = function(book){

    let notes = localStorage.getItem('notes'); //To know if something already stored 
    if (notes == null) {
        notesObj = [];    //If nothing stored create an empty array
    }
    else {
        notesObj = JSON.parse(notes); //If stored then converting those strings to Array
     }
    localStorage.setItem('notes', JSON.stringify(notesObj));
    // let html = "";
    let tableBody = document.getElementById('tableBody')
    tableBody.innerHTML="";
    notesObj.forEach(function (book, index){
    let uiString = `<tr id="tr${index}" class="rows">
                        <td scope="col" style = "color:black">${book.Book}</td>
                        <td scope="col" style = "color:black">${book.Author}</td>
                        <td scope="col" style = "color:black">${book.Type}</td>
                        <td id="td">
                        <button type="button" id="${index}" onclick="return markBook(this.id)"class="${index} btn btn-dark button">Mark Book</button>
                        <button type="button" id="${index}" onclick="return deleteBook(this.id)"class="btn btn-dark button">Delete Book</button>
                        </td>
                    </tr> `

    tableBody.innerHTML += uiString;
console.log(uiString);
   });



}
//libraryFormSubmit()    
    
// Display.prototype.clear = function () 

// Display.prototype.validate = function (book) 
// Display.prototype.show =  function (type,displayMessage) 



let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit)

function libraryFormSubmit(e) {
    console.log('You have submitted');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value
    }
    else if (programming.checked) {
        type = programming.value
    }
    else if (cooking.checked) {
        type = cooking.value
    }
    
    if(name.length>2 && author.length>2){
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);  //Converting to Array
    }
    let newObj = {
        Book: name,
        Author: author,
        Type: type

    }
    notesObj.push(newObj);
    localStorage.setItem('notes', JSON.stringify(notesObj)); 
    }
    var book = new Book(name, author, type)


    let display = new Display()

    if (display.validate(book)) {

        display.add(book)
        display.clear() //clear the value entered
        display.show('success','Your book has been added succesfully.')
    }
    else {
        
        display.show('danger', 'You cannot add this book.');
    
    }
    e.preventDefault()

    console.log(book)
    
   
}

function deleteBook(index){
  // let btn = document.getElementById(`${index}`);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
   // var i = r.parentNode.parentNode.rowIndex
    let tabl=document.getElementById("tableBody");
    console.log(tabl);
    row = document.getElementById(`tr${index}`)
    tabl.removeChild(row);

    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    
    console.log(notesObj);

    
    //e.preventDefault()
   // libraryFormSubmit(e);
    
    
}
function markBook(index){
    let btn = document.getElementById(`${index}`);
    btn.innerHTML = "&nbsp;&nbsp;&nbsp;Marked&nbsp;&nbsp;&nbsp;" ;
    btn.style.background = "black";
    console.log(btn);
    //let notes = localStorage.getItem('notes');
    let impRow = document.getElementById(`tr${index}`);
    impRow.style.background= "rgb(171,171,171)" ;
    //impRow.classList.add('highlight');
    console.log(impRow);
    
    
}

let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {

    let inputVal = search.value;

    console.log('input event fired', inputVal);
    let rows = document.getElementsByClassName('rows');
    console.log(rows);

    Array.from(rows).forEach(function (element,index) {
        let RowText = element.getElementsByTagName('td')[2].innerText;
        //let TitleText = element.getElementsByTagName('h3')[0].innerText;

        if(RowText.includes(inputVal)) {
            //element.style.display = "block";
            //element.style.color = "red";
           element.style.background = "rgb(255,255,153)";
        }
       else {
            element.style.display = "none";
        }
        console.log(RowText);


    });



});



//let viewBtn = document.getElementById('viewBtn');
//viewBtn.addEventListener('click',

function viewBooks(){
    //e.preventDefault()

    let notes = localStorage.getItem('notes'); //To know if something already stored 
    if (notes == null) {
        notesObj = [];   //If nothing stored create an empty array
        if(notesObj==[]){alert("No Book added");}
    }
    else {
        notesObj = JSON.parse(notes); //If stored then converting those strings to Array
     }
    localStorage.setItem('notes', JSON.stringify(notesObj));
    // let html = "";
    let tableBody = document.getElementById('tableBody')
    tableBody.innerHTML="";
    notesObj.forEach(function (book, index){
    let uiString = `<tr id="tr${index}" class="rows">
                        <td scope="col" style = "color:black">${book.Book}</td>
                        <td scope="col" style = "color:black">${book.Author}</td>
                        <td scope="col" style = "color:black">${book.Type}</td>
                        <td id="td">
                        <button id="${index}" type="button" onclick="return markBook(this.id)"class="${index} btn btn-dark button">Mark Book</button>
                        <button id="${index}" type="button" onclick="return deleteBook(this.id)"class="btn btn-dark button">Delete Book</button>
                        </td>
                    </tr> `

    tableBody.innerHTML += uiString;
console.log(uiString);
    });





}
//})