
const Form = document.getElementById("todo-form");
const Todoinput = document.getElementById("todo");
const Listg = document.querySelector(".list-group");
const Firstcardbody = document.querySelectorAll(".card-body")[0];
const Secondcardbody = document.querySelectorAll(".card-body")[1];
const Filter = document.querySelector("filter");
const Clearbutton = document.querySelector(".clear-todos");

eventlisteners(); // ??????????????????????????????????????

function eventlisteners(){ // All Eventlisteners
    Form.addEventListener("submit",addtodo);
    document.addEventListener("DOMContentLoaded",loadalltodostoui);
    Secondcardbody.addEventListener("click", deleteTodo);
    Clearbutton.addEventListener("click" , clearalltasks);  
}
function clearalltasks(){
    Clearbutton.parentElement.parentElement.remove();
}

function deleteTodo(e){
if(e.target.className === "fa fa-remove"){
    e.target.parentElement.parentElement.remove();
    showAlert("success","todo silindi");
    console.log("silindi");
}
}
function loadalltodostoui(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addtodotoui(todo);
    });
}
    function addtodo(e){
        const newTodo = Todoinput.value;
        if(newTodo === "") {
            showAlert();
        }
        else {
            addtodotoui(newTodo);
            addtodotostorage(newTodo);
        }

        function getTodosFromStorage(){
            let todos;
            if(localStorage.getItem("todos") === null){
                todos = [] ;
            }
            else{
                todos = JSON.parse(localStorage.getItem("todos"));
            }
            return todos;
        }

        function addtodotostorage(newTodo){
           let todos = getTodosFromStorage();
            
           todos.push(newTodo);
           
           localStorage.setItem("todos",JSON.stringify(todos));
        }
        
        

        if(newTodo === ""){
            showAlert("danger","lütfen bir todo girin...");
        }
        else {
            //addtodotoui(newTodo);
            showAlert("success","todo başarıyla eklendi...")
        }
               
        e.preventDefault();
    }

    function showAlert(type,message){ //template literal a variable atadık type bir variable değil ??
        const alert = document.createElement("div");
        alert.className = `alert alert-${type}`;
        alert.textContent = message;

        Firstcardbody.appendChild(alert);
        setTimeout(function(){
            alert.remove();
        },2000);
     
    }

    function addtodotoui(newTodo){

        //  <li class="list-group-item d-flex justify-content-between" id="pondik">
        //                     Todo 1
        //                     <a href = "#" class ="delete-item">
        //                         <i class = "fa fa-remove"></i>
        //                     </a>
        //                 </li> 

        // link oluşturma
        const listİtem = document.createElement("li");
        // link oluşturma
        const link = document.createElement("a");
        link.href = "#";
        link.className = "delete-item";
        link.innerHTML = "<i class = 'fa fa-remove'></i>"
        
        listİtem.className = "list-group-item d-flex justify-content-between" 

        // text node ekleme
        listİtem.appendChild(document.createTextNode(newTodo));
        listİtem.appendChild(link);
        Listg.appendChild(listİtem);
        Todoinput.value = "";
        console.log(listİtem);

    }

    