const inputForm = document.querySelector('#item')
class Grocery{
  constructor(){
    this.groceries = JSON.parse(localStorage.getItem('groceries')) || [];
  }

  updateDOM(){
    if(!this.groceries) return;
    this.groceries.forEach(item => this.createListItem(item));
  }

  updateLocalStorage(){
    localStorage.setItem('groceries', JSON.stringify(this.groceries)); //stringify converts array to string so we can store it in local storage
  }
    
  createListItem(listText){
    const li = document.createElement('li');
    li.innerHTML = 
    ` <span class="item">${listText}</span> 
      <span class="material-symbols-outlined" id="edit"> edit </span> <span class="material-symbols-outlined" id="trash"> delete </span>
    `;
    document.querySelector('ul').appendChild(li);

    //add event listener
    li.querySelector('#trash').addEventListener('click', (e) => this.deleteItem(e));
    li.querySelector('#edit').addEventListener('click',(e) => this.editItem(e));
  }

  addItem(){
    this.createListItem(inputForm.value);
    this.groceries.push(inputForm.value) //add to array of groceries
    this.updateLocalStorage(); //update the groceries local storage
    inputForm.value = ''; //clear the input
  }

  editItem(event){
    let currentText = event.target.parentNode.children[0].innerText;
    let editIndex = this.groceries.indexOf(currentText)
    const currentItem = event.target.parentNode.querySelector('.item');
    currentItem.contentEditable = true; //modify
    currentItem.focus(); //put our list item on focused state
    currentItem.addEventListener('keydown',(e)=>{
     if( e.key === "Enter") this.doneEditing(e, editIndex);
    })
    currentItem.addEventListener('blur',(e)=>{
      this.doneEditing(e, editIndex);
    })
  }

  doneEditing(event, editIndex){
    event.target.parentNode.querySelector(".item").contentEditable =false;
    let toEditText = event.target.parentNode.children[0].innerText
    this.groceries[editIndex] = toEditText; 
    this.updateLocalStorage();
  }

  deleteItem(event){
    let toDeleteText = event.target.parentNode.children[0].innerText
    document.querySelector('ul').removeChild(event.target.parentNode)
    this.groceries.splice(this.groceries.indexOf(toDeleteText),1);
    this.updateLocalStorage(); 
  }

  clearList(){
    document.querySelector("ul").innerHTML = '';
    this.groceries = [];
    localStorage.clear();
  }
}

const groceryList = new Grocery()

groceryList.updateDOM();

document.querySelector('#add').addEventListener('click',(event) => {
  event.preventDefault(); //prevent the page from refreshing after submit
  groceryList.addItem()
})

document.querySelector('#clear').addEventListener('click',()=>{
  groceryList.clearList()
})


