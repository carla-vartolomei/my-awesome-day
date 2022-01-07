const inputText = document.getElementById("task-input");
const tasksList = document.getElementById("tasks");
const taskSubmit = document.getElementById("task-submit");
 
var myTasks=[];
if(localStorage.getItem('myTasks') === null){
        myTasks = [];
} else {
    myTasks = JSON.parse(localStorage.getItem('myTasks')); 7
    refreshList();
}

    
function addItem(item, index){
        let listItem = tasksList.appendChild(document.createElement('li'));
        listItem.innerHTML= item;

        listItem.style.padding = '10px';
        listItem.style.fontSize = '25px';
        listItem.style.backgroundColor = "white";
        listItem.style.opacity="0.8";

        if(index == 0)
          listItem.style.borderRadius = '10px 10px 0 0';
    
        if(index == myTasks.length-1)
          listItem.style.borderRadius = '0 0 10px 10px';

        const deleteTask = document.createElement("button");
        deleteTask.classList.add("delete");
        deleteTask.innerText = "Delete";

        listItem.appendChild(deleteTask);
        listItem.style.display="grid";
        listItem.style.gridTemplateColumns="2fr 0.5fr";
    
        deleteTask.addEventListener('click', () => { 
            tasksList.removeChild(listItem);
            myTasks.splice(index,1);
            localStorage.setItem("myTasks", JSON.stringify(myTasks));
        })
}

function refreshList(){
    for(let task of myTasks){
        addItem(task, myTasks.indexOf(task));
    }
}

function addElementToTheList() {
        let inputField = inputText.value;
        let found = myTasks.find(item => item == inputField); 
        
        if(inputField !=0){
            if(inputField!=found){
                tasksList.innerHTML=null;
                myTasks.push(inputField);
                inputText.value=null;
                localStorage.setItem("myTasks", JSON.stringify(myTasks));
                refreshList();
            }else{
                alert('Task already added!');
            }
            
        }else
            alert('No super duper task!');
 }

taskSubmit.addEventListener('click', addElementToTheList);
inputText.addEventListener('keydown', (event) => { 
        if(event.keyCode == 13)
            addElementToTheList();
})
