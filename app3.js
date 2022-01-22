const Form = document.getElementById("todo-form");
const Todoinput = document.getElementById("todo");
const Listg = document.querySelector(".list-group");
const Firstcardbody = document.querySelectorAll(".card-body")[0];
const Secondcardbody = document.querySelectorAll(".card-body")[1];
const Filter = document.querySelector("filter");
const Clearbutton = document.querySelector("#clear-todos");

eventlisteners();

function eventlisteners() 
{
    Form.addEventListener("submit" ,addtodo);
    document.addEventListener("DOMContentLoaded", LoadAllTodosToUI);
    Secondcardbody.addEventListener("click", DeleteTodo);
    Clearbutton.addEventListener("click",ClearAllTodos);
}
function ClearAllTodos(e){
    if(confirm("are you sure?"))
    { 
    while(Listg.firstElementChild != null){
        Listg.removeChild(Listg.firstElementChild);
    }
    localStorage.removeItem("todos");
    }}

function DeleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        DeleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","todo silindi");
    }

}
function DeleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index){
        if (todo === deletetodo){
            todos.splice(index,1);
        }
       
    })

    localStorage.setItem("todos", JSON.stringify(todos));
}


function LoadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}
function addtodo(e){
  const newTodo = Todoinput.value;

  if(newTodo === ""){
    showAlert("danger", " lütfen bir todo girin...");
    
    }
    if(newTodo === "zibidi"){
        showAlert("primary" , "seni hınzır seni...");
        addTodoToUI(newTodo);
         addTodoToStorage(newTodo);

  }
  else{
      showAlert("success"," todo başarıyla eklendi");
      addTodoToStorage(newTodo);
    addTodoToUI(newTodo);
  }

  
  
    e.preventDefault();
}
function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [] ;
    }
    else {
       todos =JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
    

}
function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = message ;
    console.log(alert);
    Firstcardbody.appendChild(alert);

    setTimeout(function(){
        alert.remove();
    },2000)
}

function addTodoToUI(newTodo)
{
//     <li class="list-group-item d-flex justify-content-between" id="pondik">
//     Todo 1
//     <a href = "#" class ="delete-item">
//         <i class = "fa fa-remove"></i>
//     </a>
// </li>
const ListI = document.createElement("li");
const Link = document.createElement("a");
Link.href = "#";
Link.className = "delete-item";
Link.innerHTML = "<i class = 'fa fa-remove'></i>";
ListI.className = "list-group-item d-flex justify-content-between" ;

ListI.appendChild(document.createTextNode(newTodo));
ListI.appendChild(Link);

Listg.appendChild(ListI);
Todoinput.value = "" ;
}