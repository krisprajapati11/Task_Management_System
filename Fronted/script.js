const taskTitle = document.getElementById("taskTitle");
const taskDesc = document.getElementById("taskDesc");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", function () {
    const title = taskTitle.value;
    const desc = taskDesc.value;

    if (title === "" || desc === "") {
        alert("Please fill all fields");
        return;
    }

    const li = document.createElement("li");
    li.textContent = title + " - " + desc;

    taskList.appendChild(li);

    taskTitle.value = "";
    taskDesc.value = "";
});
clearBtn.addEventListener("click", function () {
    // taskList.innerHTML = "";
    taskDesc.value = "";
    taskTitle.value = "";
});
deleteBtn.addEventListener("click", function () {
    const lastTask = taskList.lastElementChild;
    if (lastTask) {
        taskList.removeChild(lastTask);
    }
});