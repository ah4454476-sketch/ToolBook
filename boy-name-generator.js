
// Names array
const boyNames = [
    "Liam","Noah","William","James","Oliver","Benjamin","Elijah","Lucas","Mason","Logan",
    "Alexander","Ethan","Jacob","Michael","Daniel","Henry","Jackson","Sebastian","Aiden","Matthew",
    "Samuel","David","Joseph","Carter","Owen","Wyatt","John","Jack","Luke","Jayden",
    "Dylan","Grayson","Levi","Isaac","Gabriel","Julian","Mateo","Anthony","Jaxon","Lincoln",
    "Joshua","Christopher","Andrew","Theodore","Caleb","Ryan","Asher","Nathan","Thomas","Leo",
    "Isaiah","Charles","Josiah","Hudson","Christian","Hunter","Connor","Eli","Ezra","Aaron",
    "Landon","Adrian","Jonathan","Nolan","Jeremiah","Easton","Elias","Colton","Cameron","Carson",
    "Robert","Angel","Maverick","Nicholas","Dominic","Jaxson","Greyson","Adam","Ian","Austin",
    "Santiago","Jordan","Cooper","Brayden","Roman","Evan","Ezekiel","Xavier","Jose","Jace",
    "Jameson","Leonardo","Bryson","Axel","Everett","Parker","Kayden","Miles","Sawyer","Jason"
];

// Scoped selectors
const container = document.querySelector('.my-name-generator');
const button = container.querySelector('.generate-btn');
const display = container.querySelector('.name-display');

// Generate random name
button.addEventListener('click', function() {
    const randomIndex = Math.floor(Math.random() * boyNames.length);
    display.textContent = boyNames[randomIndex];
});
