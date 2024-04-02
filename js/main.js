// ARRAY OBJECT ALL TODO LIST
let todoList = [
    {
        id: 1,
        date: "2022-04-02",
        time: "06:00",
        todo: "Morning Run",
        color: "#90C8AC",
        favorite: 1,
    },
    {
        id: 2,
        date: "2022-04-02",
        time: "08:00",
        todo: "Morning Shower",
        color: "#F37878",
        favorite: 1,
    },
    {
        id: 3,
        date: "2022-04-02",
        time: "08:30",
        todo: "Break",
        color: "#EED180",
        favorite: 1,
    },
    {
        id: 4,
        date: "2022-04-02",
        time: "10:00",
        todo: "Prepare for Campus",
        color: "#82A284",
        favorite: 0,
    },
    {
        id: 5,
        date: "2022-04-02",
        time: "10:30",
        todo: "Learning on Campus",
        color: "#82A284",
        favorite: 0,
    },
    {
        id: 6,
        date: "2022-04-02",
        time: "12:00",
        todo: "Break",
        color: "#90C8AC",
        favorite: 1,
    },
    {
        id: 7,
        date: "2022-04-02",
        time: "13:00",
        todo: "Learning on Campus",
        color: "#82A284",
        favorite: 0,
    },
    {
        id: 8,
        date: "2022-04-02",
        time: "15:00",
        todo: "Break",
        color: "#EED180",
        favorite: 1,
    },
    {
        id: 9,
        date: "2022-04-02",
        time: "16:20",
        todo: "Learning on Campus",
        color: "#82A284",
        favorite: 0,
    },
    {
        id: 10,
        date: "2022-04-02",
        time: "17:00",
        todo: "Prepare for Bootcamp Timedoor",
        color: "#82A284",
        favorite: 0,
    },
    {
        id: 11,
        date: "2022-04-02",
        time: "18:00",
        todo: "Break",
        color: "#90C8AC",
        favorite: 1,
    },
    {
        id: 12,
        date: "2022-04-02",
        time: "19:00",
        todo: "Learning on Bootcamp Timedoor",
        color: "#82A284",
        favorite: 0,
    },
    {
        id: 13,
        date: "2022-04-02",
        time: "21:00",
        todo: "Prepare for Home",
        color: "#EED180",
        favorite: 1,
    },
    {
        id: 14,
        date: "2022-04-02",
        time: "22:00",
        todo: "Continue working on campus tasks and assignments",
        color: "#82A284",
        favorite: 0,
    },
    {
        id: 15,
        date: "2022-04-03",
        time: "02:00",
        todo: "Sleep",
        color: "#82A284",
        favorite: 1,
    },
]

// VARIABLE TO HANDLE WHEN SORT FAVORITE
let statusPageFavorite = 0;

// FUNCTION TO SHOW ALL TODO LIST HTML
const showAllList = datas => {
    let content = ""
    datas.forEach(data => {
        if (data['favorite'] == 1) {
            content += `<div class="col"> <div class="card-todo" style="background-color: ${data.color};">
                            <h1 style="cursor: pointer;" onclick="detailTodoList(this)" id="${data.id}">${data.todo}</h1>
                            <p>${data.time}</p>
                            <h6>${data.date}</h6>
                            <a class="update-button" onclick="getTodoListById(${data.id}, this)" id="${data.id}">Update</a>
                            <a class="delete-button" onclick="deleteTodoList(${data.id})">Delete</a>
                            <span class="wrapper-icon" onclick="toggleFavorite(${data.id}, this)">
                                <i class="fa-solid fa-heart"></i>
                            </span>
                        </div> </div>`
        } else {
            content += `<div class="col"> <div class="card-todo" style="background-color: ${data.color};">
                            <h1 style="cursor: pointer;" onclick="detailTodoList(this)" id="${data.id}">${data.todo}</h1>
                            <p>${data.time}</p>
                            <h6>${data.date}</h6>
                            <a class="update-button" onclick="getTodoListById(${data.id}, this)" id="${data.id}">Update</a>
                            <a class="delete-button" onclick="deleteTodoList(${data.id})">Delete</a>
                            <span class="wrapper-icon" onclick="toggleFavorite(${data.id}, this)">
                                <i class="fa-regular fa-heart"></i>
                            </span>
                        </div> </div>`
        }
        document.getElementById('list-todo').innerHTML = content;
    });
    statusPageFavorite = 0
}
showAllList(todoList)

// FUNCTION TO SORT BY ASCENDING
function sortAscending() {
    todoList.sort(function(a, b) {
        let dateA = new Date(a.date + ' ' + a.time + ':00');
        let dateB = new Date(b.date + ' ' + b.time + ':00');
        return dateA - dateB;
    });
    showAllList(todoList)
    statusPageFavorite = 0
}

// FUNCTION TO SORT BY DESCENDING
function sortDescending() {
    todoList.sort(function(a, b) {
        let dateA = new Date(a.date + ' ' + a.time + ':00');
        let dateB = new Date(b.date + ' ' + b.time + ':00');
        return dateB - dateA;
    });
    showAllList(todoList)
    statusPageFavorite = 0
}

// FUNCTION TO CREATE NEW TODO LIST
function createTodoList() {
    colors = [ '#607EAA', '#AC7088', '#EED180', '#F37878', '#90C8AC', '#D8CCA3', '#82A284']
    const inputDate = document.getElementById('inputDate');
    const inputTime = document.getElementById('inputTime');
    const inputTodo = document.getElementById('inputTodo');
    if (inputDate.value == '' || inputTime.value == '' || inputTodo.value == '') {
        inputDate.value = ''
        inputTime.value = ''
        inputTodo.value = ''
        const firstRadioButton = document.getElementById('option1')
        firstRadioButton.checked = true
        alert('Failed to create new todo list data, please fill in all data forms correctly!');
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
        alert('Successfully create new todo list data!');
    }
}

// FUNCTION TO UPDATE TODO LIST
function updateTodoList(element) {
    colors = [ '#607EAA', '#AC7088', '#EED180', '#F37878', '#90C8AC', '#D8CCA3', '#82A284']
    const inputDate = document.getElementById('inputDate');
    const inputTime = document.getElementById('inputTime');
    const inputTodo = document.getElementById('inputTodo');
    if (inputDate.value == '' || inputTime.value == '' || inputTodo.value == '') {
        inputDate.value = ''
        inputTime.value = ''
        inputTodo.value = ''
        const firstRadioButton = document.getElementById('option1')
        firstRadioButton.checked = true
        element.setAttribute('data-action', 'create')
        element.innerHTML = 'Create'
        document.getElementById('buttonReset').classList.add('d-none');
        alert('Failed to update todo list data, please fill in all data forms correctly!');
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
        alert('Successfully update todo list data!');
    }
}

// FUNCTION TO GET ID TODO LIST WHEN CLICK UPDATE ON CARD TODO LIST
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
    document.getElementById('buttonSubmitCreate').classList.add('d-none');
    document.getElementById('buttonSubmitUpdate').classList.remove('d-none');
    document.getElementById('buttonReset').classList.remove('d-none');
}

// FUNCTION TO CANCEL UPDATE WHEN UPDATE TODO ACTIVE
function cancelUpdate(element) {
    const cardTodo = document.querySelector('.card-todo.active');
    cardTodo.classList.remove('active');
    document.getElementById('buttonSubmitCreate').classList.remove('d-none');
    document.getElementById('buttonSubmitUpdate').classList.add('d-none');
    element.classList.add('d-none')
    document.getElementById('inputDate').value = '';
    document.getElementById('inputTime').value = '';
    document.getElementById('inputTodo').value = '';
    const firstRadioButton = document.getElementById('option1')
    firstRadioButton.checked = true
}

// FUNCTION TO GET DETAIL TODO LIST
function detailTodoList(element) {
    confirm(`Date: ${todoList[element.getAttribute('id') - 1]['date']}
Time: ${todoList[element.getAttribute('id') - 1]['time']}
Activity: ${todoList[element.getAttribute('id') - 1]['todo']}
Color: ${todoList[element.getAttribute('id') - 1]['color']}`)
}

// FUNCTION TO DELETE TODO LIST
function deleteTodoList(todoListId) {
    if (confirm('Are you sure want to delete this todo list?') == true) {
        todoList.forEach((element, index) => {
            if ( todoListId == element.id ) {
                todoList.splice(index, 1)
            }
        })
        showAllList(todoList)
    }
}

// FUNCTION TO SEARCHING TODO LIST
function searchTodoList() {
    let text = document.getElementById("search").value;
    const result = todoList.filter(element => 
        element.todo.toLowerCase().includes(text.toLowerCase()) ||
        element.date.toLowerCase().includes(text.toLowerCase()) ||
        element.time.toLowerCase().includes(text.toLowerCase())
    );
    showAllList(result);
}

// FUNCTION TO SORT BY TODO LIST FAVORITE
function sortTodoFavorite() {
    let content = ""
    todoList.forEach(todo => {
        if (todo['favorite'] == 1) {
            content += `<div class="col"> <div class="card-todo" style="background-color: ${todo.color};">
                            <h1 style="cursor: pointer;" onclick="detailTodoList(this)" id="${todo.id}">${todo.todo}</h1>
                            <p>${todo.time}</p>
                            <h6>${todo.date}</h6>
                            <a class="update-button" onclick="getTodoListById(${todo.id}, this)" id="${todo.id}">Update</a>
                            <a class="delete-button" onclick="deleteTodoList(${todo.id})">Delete</a>
                            <span class="wrapper-icon" onclick="toggleFavorite(${todo.id}, this)">
                                <i class="fa-solid fa-heart"></i>
                            </span>
                        </div> </div>`
        }
        document.getElementById('list-todo').innerHTML = content;
    });

    statusPageFavorite = 1;
}

// FUNCTION TO CHANGE ICON AND TOGGLE FAVORITE TODO LIST
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