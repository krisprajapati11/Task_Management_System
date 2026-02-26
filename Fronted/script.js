const taskTitle = document.getElementById("taskTitle");
const taskDesc = document.getElementById("taskDesc");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editTaskId = null;

renderTasks();

addTaskBtn.addEventListener("click", function () {
    const title = taskTitle.value.trim();
    const desc = taskDesc.value.trim();

    // base validation for empty fields
    if (title === "" || desc === "") {
        alert("Please fill all fields");
        return;
    }
    if( editTaskId ){
        tasks = tasks.map(task  => {
            if( task.id === editTaskId ){
               return { ...task, title, desc };
            }
            return task;    
        })
        editTaskId = null;
        addTaskBtn.textContent = "Add Task";
    }else{

    const newTask = {
            id: Date.now(),
            title,
            desc,
            completed: false
        };
        tasks.push(newTask);
}
    saveTasks();
    renderTasks();
    taskTitle.value = "";
    taskDesc.value = "";
});

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function renderTasks(){
    taskList.innerHTML = "";
     tasks.forEach(task => {
        const li = document.createElement("li");

        li.innerHTML = `
    <input type="checkbox" ${task.completed ? "checked" : ""}>
    <span class="${task.completed ? "done" : ""}">
        ${task.title} - ${task.desc}
    </span>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">X</button>
`;


        // Complete task
        li.querySelector("input").addEventListener("change", function () {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        // Delete task
        li.querySelector(".delete-btn").addEventListener("click", function () {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        });

        // Edit task
        li.querySelector(".edit-btn").addEventListener("click", function () {
            taskTitle.value = task.title;
            taskDesc.value = task.desc;
            editTaskId = task.id;
            addTaskBtn.textContent = "Update Task";
        });


        taskList.appendChild(li);
    });
}

clearBtn.addEventListener("click", function () {
    taskDesc.value = "";
    taskTitle.value = "";
});
