document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');

    addButton.addEventListener('click', addTodo);
    todoList.addEventListener('click', handleTodoClick);

    function addTodo() {
        const task = todoInput.value.trim();
        if (task) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task}</span>
                <button class="delete-button">Delete</button>
            `;
            todoList.appendChild(li);
            todoInput.value = '';
        }
    }

    function handleTodoClick(event) {
        if (event.target.classList.contains('delete-button')) {
            event.target.parentElement.remove();
        } else {
            event.target.classList.toggle('completed');
        }
    }
});
