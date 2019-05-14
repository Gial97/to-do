let $list;
let $newTask;
let $addButton;
let $editTask;

function main(){
    $list = document.getElementById('task');
    $newTask = document.getElementById('write-task');
    $addButton = document.getElementById('add-task');

    $addButton.addEventListener('click', addImput);
    $list.addEventListener('click', taskCilck);
    
    getTodos();
}

function getTodos() {
    axios('http://195.181.210.249:3000/todo/')
        .then(response => response.data)
        .then(data => {
            data.forEach(element => {
                addTask($list, element.title, element.id)
            });
        })
}

function addTask(list, text, id){
    let newElement = document.createElement('li');

    newElement.dataset.id =id;

    let textElement = document.createElement('span');

    textElement.textContent = text;

    let editButton = document.createElement('button');

    editButton.textContent = 'Edytuj';
    editButton.classList.add('edit');

    let delteButton = document.createElement('button');

    delteButton.textContent = 'Usuń';
    delteButton.classList.add('delte');

    let acceptButton = document.createElement('button'); 

    acceptButton.textContent = 'Zatwierdz';
    acceptButton.classList.add('accept');
    acceptButton.style.display = 'none';

    let changeInput = document.createElement('input');
    changeInput.style.display = 'none';

    newElement.appendChild(textElement);
    newElement.appendChild(changeInput);

    newElement.appendChild(acceptButton);
    newElement.appendChild(editButton);
    newElement.appendChild(delteButton)


    list.appendChild(newElement);
}

function addImput() {
    let  newTask = $newTask.value;
    if(newTask) {
        axios.post('http://195.181.210.249:3000/todo/', {
            title: newTask,
            author: 'Mateusz.N'
        })
        .then(function () {
            $list.innerHTML = '';
            getTodos();
    })
        $newTask.value = "";
    }
}

function delteClickButton(event){
    let $all = 
    $textElement.textContent.value = '';
}

function editingTask (event){
        let editTask = event.target.parentElement.getElementsByTagName('span')[0];
        let newName = editTask.textContent;
        let newId = '504';
        debugger;
        axios.put('http://195.181.210.249:3000/todo/85', {
            title: newName,
            author: 'Mateusz.N',
            id: newId
        })
}


function taskCilck(event){
    if(event.target.classList.contains('edit')) {
        editClickButton(event);
    } else if(event.target.classList.contains('accept')) {
        acceptClickButton(event);
    } else if(event.target.classList.contains('delte')) {
        delteClickButton(event);
    } else {
        if(event.target.tagName === 'LI') {
            event.target.classList.toggle('corect');
        } else {
            event.target.parentElement.classList.toggle('corect');
        }
    }
}

function editClickButton(event){
    let $textElement = event.target.parentElement.getElementsByTagName('span')[0];
    let $changeInput = event.target.parentElement.getElementsByTagName('input')[0];
    let acceptButton = event.target.parentElement.getElementsByClassName('accept')[0];
    let delteButton = event.target.parentElement.getElementsByClassName('delte')[0];
    let oldName = $textElement.textContent;
    $textElement.style.display = 'none';
    event.target.style.display = 'none';

    $changeInput.value = oldName;
    $changeInput.style.display = 'inline-block';
    acceptButton.style.display = 'inline-block';
    delteButton.style.display = 'none';

}

function acceptClickButton(event){
    let $changeInput = event.target.parentElement.getElementsByTagName('input')[0];
    let $acceptButton = event.target.parentElement.getElementsByClassName('accept')[0];
    let delteButton = event.target.parentElement.getElementsByClassName('delte')[0];
    $changeInput.style.display = 'none';
    $acceptButton.style.display = 'none';

    let $textElement = event.target.parentElement.getElementsByTagName('span')[0];
    let $editButton = event.target.parentElement.getElementsByClassName('edit')[0];
    $textElement.textContent = $changeInput.value;
    $textElement.style.display = '';
    $editButton.style.display = 'inline-block';
    delteButton.style.display = 'inline-block';

    editingTask(event);

}



document.addEventListener('DOMContentLoaded', main);