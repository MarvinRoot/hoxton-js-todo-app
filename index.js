// How to work with state:
// 1. create some state
// 2. render the app based on the state
// 3. update the state
// 4. rerender the app based on the new state

const showCompletedCheckbox = document.querySelector('.show-completed-checkbox')
const todoList = document.querySelector('.todo-list')
const completedList = document.querySelector('.completed-list')

const state = {
    todos: [
        {
            title: 'Eat lunch',
            completed: true
        },
        {
            title: 'Work out',
            completed: true
        },
        {
            title: 'Make dinner',
            completed: false
        }
    ]
}

function addTodo(todo) {
    state.todos.push(todo)
}

function getCompletedTodos(){
    return state.todos.filter(function(todo){
        return todo.completed
    })
}

function getIncompletedTodos(){
    return state.todos.filter(function(todo){
        return !todo.completed
    })
}

function toggleTodo(todo){
    todo.completed = !todo.completed
}

function deleteTodo(text){
    state.todos = state.todos.filter(function(todo){
        return todo.title != text
    })
}

function renderCompletedTodos() {
    const completedTodos = getCompletedTodos()
    completedList.innerHTML = ''

    for(const todo of completedTodos){
        const liEl = document.createElement('li')
        liEl.setAttribute('class', 'todo completed')

        const completedSection = document.createElement('div')
        completedSection.setAttribute('class', 'completed-section')
            const completedCheckbox = document.createElement('input')
            completedCheckbox.setAttribute('type', 'checkbox')
            completedCheckbox.setAttribute('class', 'completed-checkbox')
        completedSection.append(completedCheckbox)

        const textSection = document.createElement('div')
        textSection.setAttribute('class', 'text-section')
            const todoText = document.createElement('p')
            todoText.setAttribute('class', 'text-section')
            todoText.textContent = todo.title
        textSection.append(todoText)

        const buttonSection = document.createElement('div')
        buttonSection.setAttribute('class', 'button-section')
            const editButton = document.createElement('button')
            editButton.setAttribute('class', 'edit')
            editButton.textContent = 'Edit'
            const deleteButton = document.createElement('button')
            deleteButton.setAttribute('class', 'delete')
            deleteButton.textContent = 'Delete'
        buttonSection.append(editButton, deleteButton)

        completedCheckbox.checked = todo.completed
        completedCheckbox.addEventListener('click', function(){
            toggleTodo(todo)
            render()
        })
        deleteButton.addEventListener('click', function(){
            deleteTodo(todo.title)
            render()
        })
        liEl.append(completedSection, textSection, buttonSection)
        completedList.append(liEl)
    }
}


function renderIncompletedTodos(){
    const incompletedTodos = getIncompletedTodos()
    todoList.innerHTML = ''

    for(const todo of incompletedTodos){
        const liEl = document.createElement('li')
        liEl.setAttribute('class', 'todo')

        const todoSection = document.createElement('div')
        todoSection.setAttribute('class', 'todo-section')
            const completedCheckbox = document.createElement('input')
            completedCheckbox.setAttribute('type', 'checkbox')
            completedCheckbox.setAttribute('class', 'completed-checkbox')
        todoSection.append(completedCheckbox)

        const textSection = document.createElement('div')
        textSection.setAttribute('class', 'text-section')
            const todoText = document.createElement('p')
            todoText.setAttribute('class', 'text-section')
            todoText.textContent = todo.title
        textSection.append(todoText)

        const buttonSection = document.createElement('div')
        buttonSection.setAttribute('class', 'button-section')
            const editButton = document.createElement('button')
            editButton.setAttribute('class', 'edit')
            editButton.textContent = 'Edit'
            const deleteButton = document.createElement('button')
            deleteButton.setAttribute('class', 'delete')
            deleteButton.textContent = 'Delete'
        buttonSection.append(editButton, deleteButton)

        completedCheckbox.checked = todo.completed
        completedCheckbox.addEventListener('click', function(){
            toggleTodo(todo)
            render()
        })
        deleteButton.addEventListener('click', function(){
            deleteTodo(todo.title)
            render()
        })
        liEl.append(todoSection, textSection, buttonSection)
        todoList.append(liEl)
    }
}

function renderAddTodo() {
    const textInput = document.querySelector('.text-input')

    const submitButton = document.querySelector('.submit-button')
    submitButton.addEventListener('click', function(event){
        event.preventDefault()
        addTodo({ title: textInput.value, completed: false})
        textInput.value = ''
        render()
    })  
}

function render() {
    renderCompletedTodos()
    renderIncompletedTodos()
    renderAddTodo()
}

render()