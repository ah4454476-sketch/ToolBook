// Girls names array (100 names)
const girlNames = [
    "Olivia","Emma","Ava","Charlotte","Sophia","Amelia","Isabella","Mia","Evelyn","Harper",
    "Camila","Gianna","Abigail","Luna","Ella","Elizabeth","Sofia","Emily","Avery","Mila",
    "Scarlett","Eleanor","Madison","Layla","Penelope","Aria","Chloe","Grace","Ellie","Nora",
    "Hazel","Zoey","Riley","Victoria","Lily","Aurora","Violet","Nova","Hannah","Emilia",
    "Zoe","Stella","Everly","Isla","Leah","Lillian","Addison","Willow","Lucy","Paisley",
    "Natalie","Naomi","Eliana","Brooklyn","Elena","Aubrey","Claire","Ivy","Kinsley","Audrey",
    "Maya","Genesis","Skylar","Bella","Aaliyah","Madelyn","Savannah","Anna","Delilah","Serenity",
    "Caroline","Kennedy","Valentina","Ruby","Sophie","Alice","Gabriella","Sadie","Hailey","Eva",
    "Emery","Autumn","Quinn","Nevaeh","Piper","Ruby","Aurora","Samantha","Leilani","Madeline",
    "Julia","Emerson","Arianna","Vivian","Kaylee","Clara","Reagan","Eleanor","Eliza","Margaret",
    "Isabelle","Melanie","Cora","Maria","Harmony","Adeline","Lydia","Athena","Jade","Willow"
];

// Scoped selectors
const container = document.querySelector('.my-name-generator');
const button = container.querySelector('.generate-btn');
const display = container.querySelector('.name-display');

// Generate random name
button.addEventListener('click', function() {
    const randomIndex = Math.floor(Math.random() * girlNames.length);
    display.textContent = girlNames[randomIndex];
});
