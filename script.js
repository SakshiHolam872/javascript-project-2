// Select elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const todoList = document.getElementById('todo-list');

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', loadTasksFromStorage);

// Add task when button is clicked
addTaskBtn.addEventListener('click', addTask);

// Add task when 'Enter' is pressed
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskItem = createTaskItem(taskText);
    todoList.appendChild(taskItem);

    // Save task to local storage
    saveTaskToStorage(taskText);

    // Clear input field
    taskInput.value = '';
}

// Function to create a task list item
function createTaskItem(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    // Complete task button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
        updateTaskInStorage(taskText, li.classList.contains('completed'));
    });

    // Delete task button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        li.remove();
        removeTaskFromStorage(taskText);
    });

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    return li;
}

// Local Storage: Save task
function saveTaskToStorage(taskText) {
    let tasks = getTasksFromStorage();
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Local Storage: Load tasks on page load
function loadTasksFromStorage() {
    let tasks = getTasksFromStorage();
    tasks.forEach(task => {
        const taskItem = createTaskItem(task.text);
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        todoList.appendChild(taskItem);
    });
}

// Local Storage: Get tasks
function getTasksFromStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

// Local Storage: Remove task
function removeTaskFromStorage(taskText) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Local Storage: Update task completion status
function updateTaskInStorage(taskText, isCompleted) {
    let tasks = getTasksFromStorage();
    tasks.forEach(task => {
        if (task.text === taskText) {
            task.completed = isCompleted;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
``
