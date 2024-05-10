document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.getElementById('todo-form');
  const todoInputTitle = document.getElementById('input-title');
  const todoInputText = document.getElementById('input-text');
  const todoList = document.getElementById('todo-list');

  function loadTodoList() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      todoList.innerHTML = '';
      tasks.forEach(todo => {
          const li = document.createElement('li');
          li.textContent = todo.title + ': ' + todo.text; // exibe o título e texto
          todoList.appendChild(li);
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