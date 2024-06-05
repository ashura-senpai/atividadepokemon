document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.getElementById('todo-form');
  const todoInputTitle = document.getElementById('input-title');
  const todoInputDescription = document.getElementById('input-text');
  const todoList = document.getElementById('todo-list');
  const editDialog = document.getElementById('edit-dialog');
  const editForm = document.getElementById('edit-form');
  const editTitle = document.getElementById('edit-title');
  const editText = document.getElementById('edit-text');
  const cancelEdit = document.getElementById('cancel-edit');
  let editIndex = null;

  function loadTodoList() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    todoList.innerHTML = '';

    tasks.forEach((todo, index) => {
      const taskItem = document.createElement('li');
      taskItem.style.border = '1px solid black';
      taskItem.style.listStyle = 'none';

      const taskTitle = document.createElement('h2');
      taskTitle.textContent = todo.title;

      const taskDescription = document.createElement('p');
      taskDescription.textContent = todo.text;
      taskDescription.style.whiteSpace = 'pre-wrap';

      const editButton = document.createElement('button');
      editButton.className = 'edit-btn';
      editButton.title = 'Editar tarefa';
      editButton.innerHTML = '✏️';
      editButton.addEventListener('click', () => openEditDialog(index, todo.title, todo.text));

      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-btn';
      deleteButton.title = 'Excluir tarefa';
      deleteButton.innerHTML = '❌';
      deleteButton.addEventListener('click', () => deleteTask(index, taskItem));

      taskItem.appendChild(taskTitle);
      taskItem.appendChild(taskDescription);
      taskItem.appendChild(editButton);
      taskItem.appendChild(deleteButton);
      todoList.appendChild(taskItem);
    });
  }

  function openEditDialog(index, title, text) {
    editIndex = index;
    editTitle.value = title;
    editText.value = text;
    editDialog.showModal();
  }

  function closeEditDialog() {
    editDialog.close();
  }

  function deleteTask(index, taskItem) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    todoList.removeChild(taskItem);
  }

  loadTodoList();

  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoTitle = todoInputTitle.value.trim();
    const todoText = todoInputDescription.value.trim();
    if (todoTitle && todoText) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push({ title: todoTitle, text: todoText });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      todoInputTitle.value = '';
      todoInputDescription.value = '';
      loadTodoList();
    }
  });

  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const editedTitle = editTitle.value.trim();
    const editedText = editText.value.trim();
    if (editedTitle && editedText) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks[editIndex] = { title: editedTitle, text: editedText };
      localStorage.setItem('tasks', JSON.stringify(tasks));
      loadTodoList();
      closeEditDialog();
    }
  });

  cancelEdit.addEventListener('click', () => {
    closeEditDialog();
  });

  function updateVisitCounter() {
    let visitData = localStorage.getItem('visitData');

    if (!visitData) {
      visitData = { count: 0, lastVisit: '' };
    } else {
      visitData = JSON.parse(visitData);
    }

    visitData.count++;
    const currentDate = new Date();

    const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const formattedDate = dateFormatter.format(currentDate);
    visitData.lastVisit = formattedDate;
    localStorage.setItem('visitData', JSON.stringify(visitData));
  }

  function updateFooter() {
    const visitData = JSON.parse(localStorage.getItem('visitData'));

    if (visitData) {
      const footerText = `Esta página foi visitada ${visitData.count} vezes. A última visita foi: ${visitData.lastVisit}`;

      const paragraph = document.createElement('p');
      paragraph.textContent = footerText;

      const footer = document.querySelector('footer');
      footer.appendChild(paragraph);
    }
  }

  function main() {
    updateVisitCounter();
    updateFooter();
  }

  window.onload = main;
});