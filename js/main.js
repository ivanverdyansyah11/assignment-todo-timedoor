let todoList = [
    {
        id: 1,
        date: "2022-08-10",
        time: "11:30",
        todo: "Belanja Mingguan",
        color: "#90C8AC"
    },
    {
        id: 2,
        date: "2022-08-10",
        time: "10:30",
        todo: "Memasak makanan",
        color: "#F37878"
    },
    {
        id: 3,
        date: "2022-08-20",
        time: "17:30",
        todo: "Belajar Coding",
        color: "#EED180"
    },
    {
        id: 4,
        date: "2022-08-13",
        time: "14:30",
        todo: "Bersih-bersih rumah",
        color: "#82A284"
    },
    {
        id: 5,
        date: "2022-08-16",
        time: "19:30",
        todo: "Mencuci Baju",
        color: "#607EAA"
    }
]

const showAllList = datas => {
    let content = ""
    datas.forEach(data => {
        content += `<div style="background-color: ${data.color};">
                        <h1>${data.todo}</h1>
                        <p>${data.time}</p>
                        <h6>${data.date}</h6>
                        <a onclick="deleteTodoList(${data.id})">Delete</a>
                    </div>`
        document.getElementById('list-todo').innerHTML = content;
    });
}
showAllList(todoList)

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
}

function sortAscending() {
    todoList.sort(function(a, b) {
        let dateA = new Date(a.date + ' ' + a.time + ':00');
        let dateB = new Date(b.date + ' ' + b.time + ':00');
        return dateA - dateB;
    });
    showAllList(todoList)
}

function sortDescending() {
    todoList.sort(function(a, b) {
        let dateA = new Date(a.date + ' ' + a.time + ':00');
        let dateB = new Date(b.date + ' ' + b.time + ':00');
        return dateB - dateA;
    });
    showAllList(todoList)
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