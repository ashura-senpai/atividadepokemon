document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.getElementById('todo-form');
  const todoInputTitle = document.getElementById('input-title');
  const todoInputText = document.getElementById('input-text');
  const todoList = document.getElementById('todo-list');

  function loadTodoList() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const todoList = document.getElementById('todo-list'); // Seleciona o elemento ul

    todoList.innerHTML = ''; // Limpa o conteúdo anterior

    tasks.forEach(todo => {
        // Cria um elemento li para cada tarefa
        const taskItem = document.createElement('li');
        taskItem.style.border = '1px solid black'; // Adiciona borda ao item da lista
        taskItem.style.listStyle = 'none'; // Remove o marcador de lista

        // Cria um elemento h2 para o título da tarefa
        const taskTitle = document.createElement('h2');
        taskTitle.textContent = todo.title; // Define o texto do título como o título da tarefa

        // Cria um elemento p para a descrição da tarefa
        const taskDescription = document.createElement('p');
        taskDescription.textContent = todo.text; // Define o texto da descrição como o texto da tarefa
        taskDescription.style.whiteSpace = 'pre-wrap'; // Aplica o estilo para exibir quebras de linha

        // Adiciona os elementos ao item da lista
        taskItem.appendChild(taskTitle);
        taskItem.appendChild(taskDescription);

        // Adiciona o item da lista ao todoList
        todoList.appendChild(taskItem);
    });
}

loadTodoList();

  todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const todoTitle = todoInputTitle.value.trim(); // pega o valor do título
      const todoText = todoInputText.value.trim(); // pega o valor do texto
      if (todoTitle && todoText) { // verifica se foi preenchido
          const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
          tasks.push({ title: todoTitle, text: todoText }); // armazena título e texto como objeto
          localStorage.setItem('tasks', JSON.stringify(tasks));
          todoInputTitle.value = ''; // limpa o input
          todoInputText.value = ''; // limpa o input
          loadTodoList();
      }
  });
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