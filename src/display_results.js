// eslint-disable-next-line import/extensions
import Accordion from 'accordion/src/accordion.mjs';
import { getAppData } from './data';

const createTodoTitle = (todo) => {
  const todoTitle = document.createElement('p');
  todoTitle.classList.add('todo-title');
  todoTitle.textContent = todo.getTitle();
  return todoTitle;
};

// temporary todo display
const createTodoContent = (todo) => {
  const todoContent = document.createElement('div');
  todoContent.classList.add('todo-content');
  const description = document.createElement('p');
  description.classList.add('todo-description');
  description.textContent = todo.getDescription();
  const dueDate = document.createElement('p');
  dueDate.classList.add('todo-duedate');
  dueDate.textContent = `Due on ${todo.getDueDate()}`;
  const notes = document.createElement('p');
  notes.classList.add('todo-notes');
  notes.textContent = todo.getNotes();
  const priority = document.createElement('p');
  priority.classList.add('todo-priority');
  priority.textContent = `This task has ${todo.getPriority()} priority`;
  const deleteTodoButton = document.createElement('button');
  deleteTodoButton.id = 'delete-todo-btn';
  deleteTodoButton.textContent = 'Delete Todo';
  const editTodoButton = document.createElement('button');
  editTodoButton.id = 'edit-todo-btn';
  editTodoButton.textContent = 'Edit Todo';
  todoContent.appendChild(description);
  todoContent.appendChild(dueDate);
  todoContent.appendChild(priority);
  todoContent.appendChild(notes);
  todoContent.appendChild(deleteTodoButton);
  todoContent.appendChild(editTodoButton);
  return todoContent;
};

const createTodoDiv = (todo) => {
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  todoDiv.appendChild(createTodoTitle(todo));
  todoDiv.appendChild(createTodoContent(todo));
  return todoDiv;
};

const createProjectTitle = (project) => {
  const projectHeader = document.createElement('div');
  const projectTitle = document.createElement('span');
  projectTitle.classList.add('project-title');
  projectTitle.textContent = project.getTitle();
  projectHeader.appendChild(projectTitle);
  return projectHeader;
};

const createProjectContent = (project) => {
  const projectTodos = document.createElement('div');
  projectTodos.classList.add('project-todos', 'accordion');
  const deleteProjectButton = document.createElement('button');
  deleteProjectButton.className = 'delete-project-btn';
  deleteProjectButton.textContent = 'Delete Todo';
  const projectControls = document.createElement('div');
  projectControls.classList.add('project-controls');
  projectControls.appendChild(deleteProjectButton);
  projectTodos.appendChild(projectControls);
  const todos = project.getTodos();
  todos.forEach(todo => {
    const todoDiv = createTodoDiv(todo);
    projectTodos.appendChild(todoDiv);
  });
  return projectTodos;
};

const createProjectDiv = (project) => {
  const projectDiv = document.createElement('div');
  projectDiv.classList.add('project');
  projectDiv.appendChild(createProjectTitle(project));
  projectDiv.appendChild(createProjectContent(project));
  return projectDiv;
};

const createResultsSection = (projects) => {
  const listOfProjects = document.createElement('div');
  listOfProjects.id = 'project-list';
  listOfProjects.classList.add('accordion');
  projects.forEach(project => {
    const projectDiv = createProjectDiv(project);
    listOfProjects.appendChild(projectDiv);
  });
  return listOfProjects;
};

const createAccordions = () => {
  const accordions = document.querySelectorAll('.accordion');
  for (let i = 0; i < accordions.length; i += 1) {
    // eslint-disable-next-line no-new
    new Accordion(accordions[i], {
      heightOffset: 20,
      modal: true,
    });
  }
};

const renderResults = () => {
  const displaySection = document.getElementById('projects-data');
  let results = document.getElementById('project-list');
  if (results !== null) {
    results.remove();
  }
  const { defaultProject, otherProjects } = getAppData();
  const allProjects = [defaultProject].concat(otherProjects);
  results = createResultsSection(allProjects);
  displaySection.appendChild(results);
  createAccordions();
};

export default renderResults;
