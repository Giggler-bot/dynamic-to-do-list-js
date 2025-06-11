document.addEventListener('DOMContentLoaded', function() {

    const addButton = document.getElementById('add-task-btn')
    const taskInput = document.getElementById('task-input')
    const taskList = document.getElementById('task-list')

    loadTasks();

    function addTask(taskText, save = true) {
         const taskText = taskInput.value.trim(); 
        if (taskText === '') {
            alert("Please enter a task");
        
        } 
        const li = document.createElement('li');
        li.textContent = taskText

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        removeBtn.onclick = () => {
            taskList.removeChild(li);   
            removeFromLocalStorage(taskText)
        }

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            saveToLocalStorage(taskText)
        }

        taskInput.value = '';

    }

    addButton.addEventListener('click', () => addTask(taskInput.value))
    taskInput.addEventListener('keypress', (event) => {
        if(event.key === 'Enter') {
            addTask(taskInput.value)
        }
    })

       function saveToLocalStorage(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Remove task from Local Storage
    function removeFromLocalStorage(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load all tasks from Local Storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach(task => addTask(task, false));
    }
})
