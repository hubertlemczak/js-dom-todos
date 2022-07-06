const todosUL = document.querySelector('#todo-list');
const addTodoForm = document.querySelector('.add-todo');

const getTodos = () =>
  fetch('http://localhost:3000/todos')
    .then((res) => res.json())
    .then((data) => data);

const addTodoListener = () => {
  addTodoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const post = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: addTodoForm.title.value,
        completed: false,
      }),
    };

    fetch('http://localhost:3000/todos', post).then(() => renderTodos());
    addTodoForm.reset();
  });
};

const renderTodos = async () => {
  todosUL.innerHTML = '';
  const todos = await getTodos();
  todos.forEach((todo) => {
    const todoLI = document.createElement('li');
    todosUL.append(todoLI);
    todoLI.innerText = todo.title;
    todoLI.addEventListener('click', () => {
      const patch = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: true,
        }),
      };

      fetch(`http://localhost:3000/todos/${todo.id}`, patch).then(() =>
        renderTodos()
      );
    });

    if (todo.completed === true) todoLI.classList.add('completed');
  });
};

renderTodos();
addTodoListener();
