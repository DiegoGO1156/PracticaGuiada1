
document.addEventListener("DOMContentLoaded", () => {
    const formTaks = document.getElementById("taskForm");
    const taskInput = document.getElementById("taskInput");
    const inputPriority = document.getElementById("priorityInput");
    const taskList = document.getElementById("taskList");
 
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
 
    renderTasks();
 
    formTaks.addEventListener("submit", (e) => {
      e.preventDefault();
      const task = taskInput.value.trim();
      const priority = inputPriority.value;
 
      if (task) {
        tasks.push({ task, priority });
        saveTasks();
        renderTasks();
        taskInput.value = "";
        inputPriority.value = "Alta";
      }
    });
 
    function renderTasks() {
      taskList.innerHTML = "";
      tasks
        .sort((a, b) => {
          const priorities = { Alta: 1, Media: 2, Baja: 3 };
          return priorities[a.priority] - priorities[b.priority];
        })
        .forEach((item, index) => {
          const li = document.createElement("li");
          li.className = "task-item d-flex justify-content-between align-items-center mb-2 p-2 bg-light border rounded";
          li.innerHTML = `
            <span>${item.task} - <strong>${item.priority}</strong></span>
            <div>
              <button class="btn btn-sm btn-success me-2" onclick="editTask(${index})">Editar</button>
              <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Eliminar</button>
            </div>
          `;
          taskList.appendChild(li);
        });
    }

    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    window.editTask = (index) => {
      const newTask = prompt("Edita tu tarea:", tasks[index].task);
      const newPriority = prompt("Edita la prioridad (Alta, Media, Baja):", tasks[index].priority);
 
      if (newTask && ["Alta", "Media", "Baja"].includes(newPriority)) {
        tasks[index] = { task: newTask, priority: newPriority };
        saveTasks();
        renderTasks();
      } else {
        alert("Entrada inválida.");
      }
    };

    window.deleteTask = (index) => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };
   
});