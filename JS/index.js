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