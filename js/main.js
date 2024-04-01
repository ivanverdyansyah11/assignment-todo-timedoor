let todoList = [
    {
        id: 1,
        date: "2022-08-10",
        time: "11:30",
        todo: "Belanja Mingguan",
        color: "#90C8AC",
        favorite: 1,
    },
    {
        id: 2,
        date: "2022-08-10",
        time: "10:30",
        todo: "Memasak makanan",
        color: "#F37878",
        favorite: 0,
    },
    {
        id: 3,
        date: "2022-08-20",
        time: "17:30",
        todo: "Belajar Coding",
        color: "#EED180",
        favorite: 0,
    },
    {
        id: 4,
        date: "2022-08-13",
        time: "14:30",
        todo: "Bersih-bersih rumah",
        color: "#82A284",
        favorite: 0,
    },
    {
        id: 5,
        date: "2022-08-16",
        time: "19:30",
        todo: "Mencuci Baju",
        color: "#607EAA",
        favorite: 0,
    }
]

let statusPageFavorite = 0;

const showAllList = datas => {
    let content = ""
    datas.forEach(data => {
        if (data['favorite'] == 1) {
            content += `<div class="card-todo" style="background-color: ${data.color};">
                            <h1 style="cursor: pointer;" onclick="detailTodoList(this)" id="${data.id}">${data.todo}</h1>
                            <p>${data.time}</p>
                            <h6>${data.date}</h6>
                            <a class="update-button" onclick="getTodoListById(${data.id}, this)" id="${data.id}">Update</a>
                            <a class="delete-button" onclick="deleteTodoList(${data.id})">Delete</a>
                            <span class="wrapper-icon" onclick="toggleFavorite(${data.id}, this)">
                                <i class="fa-solid fa-heart"></i>
                            </span>
                        </div>`
        } else {
            content += `<div class="card-todo" style="background-color: ${data.color};">
                            <h1 style="cursor: pointer;" onclick="detailTodoList(this)" id="${data.id}">${data.todo}</h1>
                            <p>${data.time}</p>
                            <h6>${data.date}</h6>
                            <a class="update-button" onclick="getTodoListById(${data.id}, this)" id="${data.id}">Update</a>
                            <a class="delete-button" onclick="deleteTodoList(${data.id})">Delete</a>
                            <span class="wrapper-icon" onclick="toggleFavorite(${data.id}, this)">
                                <i class="fa-regular fa-heart"></i>
                            </span>
                        </div>`
        }
        document.getElementById('list-todo').innerHTML = content;
    });

    statusPageFavorite = 0
}
showAllList(todoList)

function sortAscending() {
    todoList.sort(function(a, b) {
        let dateA = new Date(a.date + ' ' + a.time + ':00');
        let dateB = new Date(b.date + ' ' + b.time + ':00');
        return dateA - dateB;
    });
    showAllList(todoList)
    statusPageFavorite = 0
}

function sortDescending() {
    todoList.sort(function(a, b) {
        let dateA = new Date(a.date + ' ' + a.time + ':00');
        let dateB = new Date(b.date + ' ' + b.time + ':00');
        return dateB - dateA;
    });
    showAllList(todoList)
    statusPageFavorite = 0
}

function createAndUpdateTodoList(element) {
    colors = [ '#607EAA', '#AC7088', '#EED180', '#F37878', '#90C8AC', '#D8CCA3', '#82A284']
    const inputDate = document.getElementById('inputDate');
    const inputTime = document.getElementById('inputTime');
    const inputTodo = document.getElementById('inputTodo');
    if (element.getAttribute('data-action') == 'create') {
        if (inputDate.value == '' || inputTime.value == '' || inputTodo.value == '') {
            inputDate.value = ''
            inputTime.value = ''
            inputTodo.value = ''
            const firstRadioButton = document.getElementById('option1')
            firstRadioButton.checked = true
            confirm('Please enter data first!');
        } else {
            const radioColors = document.querySelector('[name="colorOption"]:checked');
            indexColor = parseInt(radioColors.getAttribute("id").slice(6)) - 1;
            const newTodoList = { 
                id: todoList.length + 1,
                date: inputDate.value,
                time: inputTime.value,
                todo: inputTodo.value,
                color: colors[indexColor],
            }
            todoList.push(newTodoList)
            inputDate.value = ''
            inputTime.value = ''
            inputTodo.value = ''
            const firstRadioButton = document.getElementById('option1')
            firstRadioButton.checked = true
            showAllList(todoList)
        }
    } else if(element.getAttribute('data-action') == 'update') {
        if (inputDate.value == '' || inputTime.value == '' || inputTodo.value == '') {
            inputDate.value = ''
            inputTime.value = ''
            inputTodo.value = ''
            const firstRadioButton = document.getElementById('option1')
            firstRadioButton.checked = true
            element.setAttribute('data-action', 'create')
            element.innerHTML = 'Create'
            document.getElementById('buttonReset').classList.add('d-none');
            confirm('Please enter data first!');
        } else {
            const radioColors = document.querySelector('[name="colorOption"]:checked');
            indexColor = parseInt(radioColors.getAttribute("id").slice(6)) - 1;
            todoList.forEach(list => {
                if (list['id'] == `${inputId.value}`) {
                    list['date'] = inputDate.value
                    list['time'] = inputTime.value
                    list['todo'] = inputTodo.value
                    list['color'] = colors[indexColor]
                    inputDate.value = ''
                    inputTime.value = ''
                    inputTodo.value = ''
                    const firstRadioButton = document.getElementById('option1')
                    firstRadioButton.checked = true
                    element.setAttribute('data-action', 'create')
                    element.innerHTML = 'Create'
                    document.getElementById('buttonReset').classList.add('d-none');
                    showAllList(todoList)
                }
            });
        }
    }
}

function getTodoListById(dataId, element) {
    const cardTodos = document.querySelectorAll('.card-todo');
    cardTodos.forEach(card => {
        card.classList.remove('active');
    });
    const inputColorAll = document.querySelectorAll('[for="inlineRadio2"]')
    inputColorAll.forEach(inputColor => {
        if (inputColor.getAttribute('data-color') == `${todoList[dataId - 1]['color']}`) {
            inputColor.parentElement.querySelector('[type="radio"]').checked = true
            element.parentElement.classList.add('active');
        } else {
            inputColor.parentElement.querySelector('[type="radio"]').checked = false
        }
    });
    document.getElementById('inputId').value = todoList[dataId - 1]['id'];
    document.getElementById('inputDate').value = todoList[dataId - 1]['date'];
    document.getElementById('inputTime').value = todoList[dataId - 1]['time'];
    document.getElementById('inputTodo').value = todoList[dataId - 1]['todo'];
    document.getElementById('buttonSubmit').setAttribute('data-action', 'update');
    document.getElementById('buttonSubmit').innerHTML = 'Update';
    document.getElementById('buttonReset').classList.remove('d-none');
}

function cancelUpdate(element) {
    const cardTodo = document.querySelector('.card-todo.active');
    cardTodo.classList.remove('active');
    document.getElementById('buttonSubmit').setAttribute('data-action', 'create');
    document.getElementById('buttonSubmit').innerHTML = 'Create';
    element.classList.add('d-none')
    document.getElementById('inputDate').value = '';
    document.getElementById('inputTime').value = '';
    document.getElementById('inputTodo').value = '';
    const firstRadioButton = document.getElementById('option1')
    firstRadioButton.checked = true
}

function detailTodoList(element) {
    confirm(`Date: ${todoList[element.getAttribute('id') - 1]['date']}
Time: ${todoList[element.getAttribute('id') - 1]['time']}
Activity: ${todoList[element.getAttribute('id') - 1]['todo']}
Color: ${todoList[element.getAttribute('id') - 1]['color']}`)
}

function deleteTodoList(todoListId) {
    todoList.forEach((element, index) => {
        if ( todoListId == element.id ) {
            todoList.splice(index, 1)
        }
    })
    showAllList(todoList)
}

function searchTodoList() {
    let text = document.getElementById("search").value;
    const result = todoList.filter(element => 
        element.todo.toLowerCase().includes(text.toLowerCase()) ||
        element.date.toLowerCase().includes(text.toLowerCase()) ||
        element.time.toLowerCase().includes(text.toLowerCase())
    );
    showAllList(result);
}

function sortTodoFavorite() {
    let content = ""
    todoList.forEach(todo => {
        if (todo['favorite'] == 1) {
            content += `<div class="card-todo" style="background-color: ${todo.color};">
                            <h1 style="cursor: pointer;" onclick="detailTodoList(this)" id="${todo.id}">${todo.todo}</h1>
                            <p>${todo.time}</p>
                            <h6>${todo.date}</h6>
                            <a class="update-button" onclick="getTodoListById(${todo.id}, this)" id="${todo.id}">Update</a>
                            <a class="delete-button" onclick="deleteTodoList(${todo.id})">Delete</a>
                            <span class="wrapper-icon" onclick="toggleFavorite(${todo.id}, this)">
                                <i class="fa-solid fa-heart"></i>
                            </span>
                        </div>`
        }
        document.getElementById('list-todo').innerHTML = content;
    });

    statusPageFavorite = 1;
}

function toggleFavorite(dataId, element) {
    let id = dataId - 1;
    if (todoList[id]['favorite'] == 0) {
        todoList[id]['favorite'] = 1;
        element.querySelector('i').setAttribute('class', 'fa-solid fa-heart');
    } else if(todoList[id]['favorite'] == 1) {
        todoList[id]['favorite'] = 0;
        element.querySelector('i').setAttribute('class', 'fa-regular fa-heart');
    }

    if (statusPageFavorite == 1) {
        sortTodoFavorite();
    }
}