let $list;
let $newTask;
let $addButton;

function main(){
    $list = document.getElementById('task');
    $newTask = document.getElementById('write-task');
    $addButton = document.getElementById('add-task');

    $addButton.addEventListener('click', addImput);
    $list.addEventListener('click', taskCilck);
}
addTask(task, 'Coś' )

function addTask(list, text){
    let newElement = document.createElement('li');
    let textElement = document.createElement('span');

    textElement.textContent = text;

    let editButton = document.createElement('button');

    editButton.textContent = 'Edytuj';
    editButton.classList.add('edit');
    newElement.appendChild(textElement);
    newElement.appendChild(editButton);

    list.appendChild(newElement);

}

function addImput() {
    let  newText = $newTask.value;
    if(newText){
        addTask(task, newText);
        $newTask.value = "";
    }
}

function taskCilck(event){
    if(event.target.classList.contains('edit')) {
        editClickButton();
    } else {
        event.target.classList.toggle('corect')
    }
}


function editClickButton(event){
    let $textElement = event.target.parentElement.getElementsByTagName('span')[0];
    let oldname = $textElement.textContent;
    $textElement.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', main);