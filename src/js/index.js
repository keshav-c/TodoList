import 'accordion/src/accordion.css';
import '../css/style.scss';
import getModal from './form_builder/modal';
import render from './display/display_results';

const contentTag = document.getElementById('content');
const h1 = document.createElement('h1');
h1.textContent = 'ToDo List App';
h1.id = 'title-tag';
contentTag.appendChild(h1);

const modalContainer = document.createElement('div');
modalContainer.id = 'modal-box';
modalContainer.appendChild(getModal('project'));
modalContainer.appendChild(getModal('todo'));
contentTag.appendChild(modalContainer);

const displaySection = document.createElement('section');
displaySection.id = 'projects-data';

const projectControls = document.createElement('div');
projectControls.id = 'project-control';
const addProjectButton = document.createElement('button');
addProjectButton.id = 'add-project-btn';
addProjectButton.textContent = 'Add Project';
projectControls.appendChild(addProjectButton);
addProjectButton.onclick = () => {
  const modal = document.getElementById('project-form-box');
  modal.classList.toggle('show-form');
};
displaySection.appendChild(projectControls);

contentTag.appendChild(displaySection);
render();
