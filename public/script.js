document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("task-list");
  const addTaskForm = document.getElementById("add-task-form");
  const taskInput = document.getElementById("task-input");
  const taskDescription = document.getElementById("task-description");
  const taskDeadline = document.getElementById("task-deadline");

  /**
   * Charger les tâches depuis le Local Storage
   */
  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Récupère ou initialise un tableau vide
    taskList.innerHTML = ""; // Vide la liste pour la recharger

    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = `list-group-item d-flex justify-content-between align-items-center ${new Date(task.deadline) < new Date() ? 'bg-danger text-white' : ''}`;
      li.innerHTML = `
        <label class="form-check-label ${task.done ? 'text-decoration-line-through' : ''}">
          <input class="form-check-input" type="checkbox" ${task.done ? 'checked' : ''}> 
          ${task.text}
        </label>
        <p class="task-description">${task.description}</p>
        <p class="task-deadline">Deadline: ${new Date(task.deadline).toLocaleString()}</p>
        <button class="btn btn-sm btn-danger delete-task">🗑️</button>
      `;

      // Ajouter l'événement de changement de statut (checkbox)
      li.querySelector("input").addEventListener("change", (e) => {
        tasks[index].done = e.target.checked; // Mise à jour de l'état de la tâche
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Sauvegarde dans le Local Storage
        loadTasks(); // Recharge la liste
      });

      // Supprimer la tâche
      li.querySelector(".delete-task").addEventListener("click", () => {
        tasks.splice(index, 1); // Supprime la tâche
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Sauvegarde les tâches mises à jour
        loadTasks(); // Recharge la liste
      });

      taskList.appendChild(li); // Ajoute la tâche à la liste
    });
  };

  /**
   * Ajouter une tâche via le formulaire
   */
  if (addTaskForm) {
    addTaskForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Empêche le rechargement de la page

      const taskText = taskInput.value.trim(); // Récupère la valeur du champ "Nom de la tâche"
      const descriptionText = taskDescription.value.trim(); // Récupère la description
      const deadlineText = taskDeadline.value; // Récupère la date et heure de la deadline

      // Vérifie si la tâche a un texte et une deadline valide
      if (taskText === "" || !deadlineText) return; // Ignore les entrées vides

      const deadlineDate = new Date(deadlineText);

      // Valide que la deadline n'est pas dans le passé
      if (deadlineDate < new Date()) {
        alert("La deadline ne peut pas être dans le passé.");
        return;
      }

      const tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Récupère les tâches existantes
      tasks.push({ text: taskText, description: descriptionText, done: false, deadline: deadlineDate.toISOString() }); // Ajoute la nouvelle tâche avec description et deadline
      localStorage.setItem("tasks", JSON.stringify(tasks)); // Sauvegarde dans le Local Storage

      taskInput.value = ""; // Réinitialise le champ "Nom de la tâche"
      taskDescription.value = ""; // Réinitialise le champ "Description"
      taskDeadline.value = ""; // Réinitialise le champ "Deadline"
      window.location.href = "/"; // Redirige vers la liste des tâches
    });
  }

  // Charger les tâches au démarrage
  loadTasks();
});
