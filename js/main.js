const inputForm = document.querySelector('#item')

class Grocery{
  constructor(){

  }
  addItem(){
    console.log(inputForm.value)

    const li = document.createElement('li');
    li.innerHTML = 
    `<span class="item">${inputForm.value}</span> 
    <span class="material-symbols-outlined" id="edit"> edit </span> <span class="material-symbols-outlined" id="trash"> delete </span>
    `;
    document.querySelector('ul').appendChild(li);

    //add event listener
    li.querySelector('#trash').addEventListener('click', (e) => this.deleteItem(e));
    li.querySelector('#edit').addEventListener('click',(e) => this.editItem(e));

  }
  editItem(event){
    event.target.parentNode.querySelector(".item").contentEditable = true; //modify
    event.target.parentNode.querySelector(".item").focus(); //put our list item on focused state
    event.target.parentNode.querySelector(".item").addEventListener('keydown',(e)=>{
     if( e.key === "Enter"){
      event.target.parentNode.querySelector(".item").contentEditable =false;
     }
      

    })

  }

  deleteItem(event){
    console.log(event.target.parentNode);
    //remove li element
    document.querySelector('ul').removeChild(event.target.parentNode)
    //we target the parentnode, we use the method to remove a child from the parent
  }

  clearList(){
    document.querySelector("ul").innerHTML = '';
  }
}

const groceryList=new Grocery()
document.querySelector('#add').addEventListener('click',(event) => {
  event.preventDefault(); //prevent the page from refreshing after submit
  groceryList.addItem()
})

document.querySelector('#clear').addEventListener('click',()=>{
  groceryList.clearList()
})

