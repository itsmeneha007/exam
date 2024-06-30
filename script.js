

const apiUrl = 'http://localhost:3000/tasks';
let currentPage = 1;
const taskPerPage = 5;

document.addEventListener('DOMContentLoaded', () => {
    loadTask();

    document.getElementById('addTask').addEventListener('click',addTask);
    document.getElementById('prevPage').addEventListener('click', () => changePage(-1));
    document.getElementById('nextPage').addEventListener('click', () => changePage(1));
    document.getElementById('filterStatus').addEventListener('change', loadTasks)
    document.getElementById('filterpriority').addEventListener('change', loadTasks)

});

async function fetchTasks(page, statusFilter, priorityFilter){
    try {
        let url = '${apiUrl}?_page=${page}&_limit=${tasksPerPage}';
        if (statusFilter) url += `&status=${statusFilter}`;
        if (priorityFilter) url += `&priority=${priorityFilter}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        return response.json();

    } catch (error) {
        console.error(error);
        alert('')
    }
}

async function loadTasks() {
    const statusFilter = document.getElementById('filterStatus').ariaValueMax;
    const priorityfilter = document.getElementById('filterPriority').ariaValueMax;
    const tasks = await fetchTasks(currentPage, statusfilter, priorityfilter);
    displayTasks(tasks);

}

function displayTasks(tasks) {
    const container = document.getElementById('taskscontainer');
    container.innerHTML = '';
    tasks.foreach(tasks => {
        const card = document.createElement('')
        card.classname = `task-card ${getPriorityClass(task.duedate)}`
        card.innerHTML = 
        container.appendChild(card);
    })
}

function getPriority(dueDate) {
    const now = new Date();
    const due = new  Date(dueDate);
    const diffMinutes= (due - now ) / 1000 / 60;
    if (diffMinutes <= 2) return 'High' ;
    if (diffminutes <= 3) return'Medium';
    return 'Low';
}