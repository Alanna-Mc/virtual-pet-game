// Variable that identifies that the game is not yet active
let gameActive = false;


// Get references to the HTML elements
// Name button elements
const randomNameButton = document.getElementById('random-name');
const submitNameButton = document.getElementById('submit-name');
// Action button elements
const actionButtons = document.getElementById('action-buttons');
const eatButton = document.getElementById('eat-button');
const sleepButton = document.getElementById('sleep-button');
const playButton = document.getElementById('play-button');
const washButton = document.getElementById('wash-button');
const petImage = document.getElementById('pet-image');
// Setting button elements
const saveButton = document.getElementById('save');
const loadButton = document.getElementById('load');
const resetButton = document.getElementById('reset');
const settingButtons = document.getElementById('setting-buttons');

// H1 Element
let newTitle = document.getElementById("title");

// Textbox input
const petNameInput = document.getElementById("pet-name-input");

// Name box
const nameElements = document.getElementById('name');

// Pet stats display
const petStatsDisplay = document.getElementById('stats');

// Elements for each stat display
const hungerStateElement = document.getElementById('hunger-state');
const energyStateElement = document.getElementById('energy-state');
const happinessStateElement = document.getElementById('happiness-state');
const cleanlinessStateElement = document.getElementById('cleanliness-state');


// Add event listeners to the buttons
// Name button elements
randomNameButton.addEventListener('click', getRandomName);
submitNameButton.addEventListener('click', givePetName);
//Action button elements
eatButton.addEventListener('click', feedPet);
sleepButton.addEventListener('click', sleepPet);
playButton.addEventListener('click', playPet);
washButton.addEventListener('click', washPet);
//Setting Buttons
saveButton.addEventListener('click', saveGame);
loadButton.addEventListener('click', loadGame);
resetButton.addEventListener('click', resetGame);
// Mouse hover
petImage.addEventListener('click', ticklePet);


// Function to update pet name
function givePetName(){
  
  // Get input from text box and update pet name 
  const petNameInputValue = petNameInput.value;
  // Add new pet name to title
  newTitle.innerHTML = `My Virtual Pet, ${petNameInputValue}!`;
  
  // Hide name elements
  nameElements.classList = 'hidden';
  
  // Show game action buttons
  actionButtons.classList.remove('hidden');
  actionButtons.classList.add('reveal');
  
  // Show setting butons
  settingButtons.classList.remove('hidden');
  settingButtons.classList.add('reveal');
  
  // Show pet current state display
  petStatsDisplay.classList.remove('hidden');
  petStatsDisplay.classList.add('reveal');
  
  // Start game
  gameActive = true;
  
  reducePetState()  
}


// Function to generate random name
function getRandomName(){
  
  // Array of names
  const names = ['Daryl', 'Fizz', 'Bonez', 'Teddy', 'Toby', 'Fluffy', 'Gizmo', 'Grogu', 'Coco', 'Bella', 'Charlie', 'Luna', 'Max', 'Milo', 'Rosie', 'Sunny', 'Pixi', 'Cuddles', 'Frog', 'Crumbs', 'Kiki', 'Biscuit', 'Cookie', 'Mochi', 'Kirby', 'Tammy', 'Tiki', 'Daisy', 'Bug', 'Kitty', 'Marble', 'Frogosaur', 'Forg', 'Frogbopulos Michael', 'Princess']

  // Select a random index from the array
  const randomIndex = Math.floor(Math.random() * names.length);

  // Get the random name based on the random index
  const randomName = names[randomIndex];
  
  // Put name into textbox placeholder
  petNameInput.value = randomName;
}


// Object to reflect pet wellbeing status
let petState = {
  hunger: 10,
  energy: 10,
  happiness: 10,
  cleanliness: 10
};


// Function to update pet stats, change image and colour depedning on mood
function updateDisplayedPetState() {
  
  document.getElementById('hunger-state').textContent = petState.hunger;
  document.getElementById('energy-state').textContent = petState.energy;
  document.getElementById('happiness-state').textContent = petState.happiness;
  document.getElementById('cleanliness-state').textContent = petState.cleanliness;
  
  const sadImageUrl = './FrogImages/sad.png';
  const madImageUrl = './FrogImages/mad.png';
    
  // Update the colour/image of each stat display based on its value
  if (petState.hunger <= 2) {
    hungerStateElement.style.color = 'red';
    petImage.src = sadImageUrl;
  } else if (petState.hunger <= 4) {
    hungerStateElement.style.color = 'yellow';
    petImage.src = madImageUrl;
  } else {
    hungerStateElement.style.color = 'green';
  }

  if (petState.energy <= 2) {
    energyStateElement.style.color = 'red';
    petImage.src = sadImageUrl;
  } else if (petState.energy <= 4) {
    energyStateElement.style.color = 'yellow';
    petImage.src = madImageUrl;
  } else {
    energyStateElement.style.color = 'green';
  }
  if (petState.happiness <= 2) {
    happinessStateElement.style.color = 'red';
    petImage.src = sadImageUrl;
  } else if (petState.happiness <= 4) {
    happinessStateElement.style.color = 'yellow';
    petImage.src = madImageUrl;
  } else {
    happinessStateElement.style.color = 'green';
  }

  if (petState.cleanliness <= 2) {
    cleanlinessStateElement.style.color = 'red';
    petImage.src = sadImageUrl;
  } else if (petState.cleanliness <= 4) {
    cleanlinessStateElement.style.color = 'yellow';
    petImage.src = madImageUrl;
  } else {
    cleanlinessStateElement.style.color = 'green';
  }
};


// Function to reduce pet well-being stats
function reducePetState() {
  if (gameActive === true) {
    // Decrement the pet's states by 1 and ensure they don't go below 0
    petState.hunger = Math.max(petState.hunger - 1, 0);
    petState.energy = Math.max(petState.energy - 1, 0);
    petState.happiness = Math.max(petState.happiness - 1, 0);
    petState.cleanliness = Math.max(petState.cleanliness - 1, 0);
    
    updateDisplayedPetState()
    
     if (petState.hunger === 0){     
       petDeath();
     }
  }
}

  
  // Call the reducePetState function every 3 seconds 
  setInterval(reducePetState, 3000);


// Function to feed pet
function feedPet()
{
  // Add 5 points to the pet's hunger score
  petState.hunger = Math.min(petState.hunger + 5, 10);

  // Update the displayed pet status on screen
  updateDisplayedPetState();
  
  // Update image for this action
  const eatingImageUrl = './FrogImages/eat.png'; 
  petImage.src = eatingImageUrl;
  
  // Reset to default image
  resetDefaultImage();
  
}


// Function to put pet to sleep
function sleepPet(){
  
  petState.energy = Math.min(petState.energy + 5, 10);

  updateDisplayedPetState();

  const sleepImageUrl = './FrogImages/sleep.png'; 
  petImage.src = sleepImageUrl;

  resetDefaultImage();
  
}


// Function to play with pet (Happiness)
function playPet(){
  
  petState.happiness = Math.min(petState.happiness + 5, 10);

  updateDisplayedPetState();

  const playImageUrl = './FrogImages/play.png'; 
  petImage.src = playImageUrl;

  resetDefaultImage();
  
}


// Function to clean pet
function washPet(){
  
  petState.cleanliness = Math.min(petState.cleanliness + 10, 10);

  updateDisplayedPetState();

  const playImageUrl = './FrogImages/wash.png'; 
  petImage.src = playImageUrl;

  resetDefaultImage();
}

// Pet death function
function petDeath(){
   
  const deadImageUrl = './FrogImages/death.png'; 
  petImage.src = deadImageUrl;
  const petName = petNameInput.value; 
  newTitle.innerHTML = `Oh no, ${petName} Died!`;
  
  // Stop Game
  gameActive = false;
  
  // Disable all the action buttons
  eatButton.disabled = true;
  sleepButton.disabled = true;
  playButton.disabled = true;
  washButton.disabled = true;
  
}

function ticklePet(){
  
  if (gameActive === true){
  
  petState.happiness = Math.min(petState.happiness + 3, 10);

  updateDisplayedPetState();

  const tickleImageUrl = './FrogImages/tickle.png'; 
  petImage.src = tickleImageUrl;
    
    setTimeout(function () {
   const defaultImageUrl = './FrogImages/default.png'; 
     
    petImage.src = defaultImageUrl;
    }, 1000); 
  }
}

// Restore the pet image to the default after a few seconds
   function resetDefaultImage (defaultImageUrl, delay) {
   setTimeout(function () {
   const defaultImageUrl = './FrogImages/default.png'; 
     
    petImage.src = defaultImageUrl;
  }, 3000); // 3000 milliseconds (3 seconds)
   }


function resetGame(){
  
  // end game
  gameActive = false;
  
  resetPetStats()
  const defaultImageUrl = './FrogImages/default.png';
  petImage.src = defaultImageUrl;
  
   // Hide/show elements
  actionButtons.classList.remove('reveal');
  settingButtons.classList.remove('reveal');
  petStatsDisplay.classList.remove('reveal');
  nameElements.classList = ('reveal');
  actionButtons.classList.add('hidden');
  settingButtons.classList.add('hidden');
  petStatsDisplay.classList.add('hidden');

  newTitle.innerHTML = 'My Virtual Pet';
  petNameInput.value = '';
  petNameInput.placeholder = 'Give me a name';

  }

// Function to reset the pet's stats to 10
function resetPetStats() {
  petState.hunger = 10;
  petState.energy = 10;
  petState.happiness = 10;
  petState.cleanliness = 10;
  
  // Update the displayed pet status on screen
  updateDisplayedPetState();
  
  // Enable all the action buttons
  eatButton.disabled = false;
  sleepButton.disabled = false;
  playButton.disabled = false;
  washButton.disabled = false;
}


/* function saveGame(){
    // Convert petState object to JSON string
  const petStateJSON = JSON.stringify(petState);

  // Save the JSON string to localStorage
  localStorage.setItem('petState', petStateJSON);

  // Feedback to the user that the game is saved.
  console.log('Game saved successfully!');
  
} */

/* function loadGame() {
    // Get the petState JSON string from localStorage
    const petStateJSON = localStorage.getItem('petState');
  
    // Check if there is any saved data
    if (petStateJSON) {
      // Parse the JSON string back to an object and update petState
      petState = JSON.parse(petStateJSON);
  
      // Update the displayed pet status on screen
      updateDisplayedPetState();
  
      // Display feedback to the user that the game is loaded.
      console.log('Game loaded successfully!');
    } else {
      // If there is no saved data, feedback to the user.
      console.log('No saved game found.');
    }
} */