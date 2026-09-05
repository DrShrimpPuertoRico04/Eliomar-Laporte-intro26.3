const body = document.getElementsByTagName("body")[0];

const footerElement = document.createElement("footer");

body.appendChild(footerElement);

const today = new Date();

const thisYear = today.getFullYear();

const footer = document.querySelector("footer");

const copyright = document.createElement("p");

copyright.innerHTML = `© ${thisYear} Eliomar Laporte`;

footer.appendChild(copyright);

const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "Git",
    "GitHub",
    "VS Code"
];

const skillsSection = document.getElementById("Skills");

const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement("li");

    skill.innerText = skills[i];

    skillsList.appendChild(skill);
}

const messageForm = document.querySelector('[name="leave_message"]');

messageForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const usersName = event.target.usersName.value;
  const usersEmail = event.target.usersEmail.value;
  const usersMessage = event.target.usersMessage.value;

  console.log(usersName, usersEmail, usersMessage);

  const messageSection = document.querySelector('#messages');
  const messageList = messageSection.querySelector('ul');

  const newMessage = document.createElement('li');

  newMessage.innerHTML = '<a href="mailto:' + usersEmail + '">' + usersName + '</a>: <span>' + usersMessage + '</span>';

  const removeButton = document.createElement('button');
  removeButton.innerText = 'remove';
  removeButton.setAttribute('type', 'button');

  removeButton.addEventListener('click', function(event) {
    const entry = event.target.parentNode;
    entry.remove();
  });

  newMessage.appendChild(removeButton);

  messageList.appendChild(newMessage);

  messageForm.reset();
});

const projectSection = document.querySelector('#Projects');
const projectList = projectSection.querySelector('ul');

fetch('https://api.github.com/users/DrShrimpPuertoRico04/repos')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    const repositories = data;

    console.log(repositories);

    for (let i = 0; i < repositories.length; i++) {
      const project = document.createElement('li');

      project.innerText = repositories[i].name;

      projectList.appendChild(project);
    }
  })
  .catch(function(error) {
    console.error('Error fetching repositories:', error);
    projectSection.innerHTML += '<p>Unable to load projects. Please try again later.</p>';
  });


