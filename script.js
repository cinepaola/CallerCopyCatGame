// JavaScript code for the game

// Get DOM elements
const callerNameElement = document.getElementById('callerName');
const callerPhoneNumberElement = document.getElementById('callerPhoneNumber');
const callerEmailElement = document.getElementById('callerEmail');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const phoneNumberInput = document.getElementById('phoneNumber');
const emailInput = document.getElementById('email');
const startButton = document.getElementById('startButton');
const doneButton = document.getElementById('doneButton');
const timeLeftElement = document.getElementById('timeLeft');
const activityCounterElement = document.getElementById('activityCounter');
const resultMessageElement = document.getElementById('resultMessage');

// Initialize game variables
let timer;
let timeLeft = 20;
let activityCounter = 1; // Track the number of activities completed
const totalActivities = 30; // Total number of activities to complete
let callerInfo = {
    name: '',
    phoneNumber: '123-456-7890',
    email: 'johndoe@example.com'
};
let namesPool = ['John Doe', 'Jane Smith', 'Michael Johnson', 'Emily Brown', 'William Lee', 'Sophia Wilson', 'James Martin', 'Isabella Taylor', 'David Martinez', 'Olivia Anderson', 'Benjamin Thomas', 'Ava Garcia', 'Michael Moore', 'Emma Rodriguez', 'Daniel Clark', 'Mia Lewis', 'Alexander Young', 'Abigail Walker', 'Joseph Hill', 'Charlotte Baker', 'Matthew Turner', 'Harper Garcia', 'David Scott', 'Amelia Nelson', 'Andrew King', 'Ella Foster', 'Logan Roberts', 'Elizabeth Kelly', 'William Morgan', 'Grace Cook', 'Lucas Mitchell', 'Chloe Brooks', 'Henry Watson', 'Victoria Murphy', 'Ethan Reed', 'Lily Rivera', 'Daniel Perry', 'Layla Sanchez', 'Jackson Bell', 'Sofia Flores', 'Sebastian Cooper', 'Hannah Richardson', 'Aiden Cox', 'Nora Cox', 'Lucas Kelly', 'Madison Ward', 'Joseph Diaz', 'Aubrey Price', 'Samuel Morris', 'Brooklyn Hughes'];

// Function to shuffle an array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to set caller information
function setCallerInformation() {
    callerNameElement.textContent = callerInfo.name;
    callerPhoneNumberElement.textContent = callerInfo.phoneNumber;
    callerEmailElement.textContent = callerInfo.email;
}

// Function to generate random email with a fake domain
function generateRandomEmail(name) {
    const randomDomain = ['example.com', 'testmail.com', 'mailprovider.org', 'fakedomain.net'];
    const [firstName, lastName] = name.split(' ');
    const randomNumber = Math.floor(Math.random() * randomDomain.length);
    const domain = randomDomain[randomNumber];
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
}

// Function to generate random caller information
function generateRandomCallerInfo() {
    // Shuffle the namesPool to get a new random order each time
    shuffleArray(namesPool);

    // Take the first name from the shuffled namesPool and use it as the caller's name
    const name = namesPool.pop();

    return {
        name: name,
        phoneNumber: '123-456-7890', // Replace with a real random phone number generator if needed
        email: generateRandomEmail(name) // Generate random email with the name provided
    };
}

// Function to clear caller profile input fields
function clearCallerProfile() {
    firstNameInput.value = '';
    lastNameInput.value = '';
    phoneNumberInput.value = '';
    emailInput.value = '';
}

// Function to start the game
function startGame() {
    // Reset time
    timeLeft = 20;
    timeLeftElement.textContent = timeLeft;
    resultMessageElement.textContent = '';

    // Set caller information
    callerInfo = generateRandomCallerInfo(); // Generate new random caller information
    setCallerInformation();

    // Clear caller profile input fields
    clearCallerProfile();

    // Enable input fields
    firstNameInput.disabled = false;
    lastNameInput.disabled = false;
    phoneNumberInput.disabled = false;
    emailInput.disabled = false;

    // Show the "Done" button and hide the "Start Game" button
    doneButton.style.display = 'inline-block';
    startButton.style.display = 'none';

    // Start the timer
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

// Function to update the timer
function updateTimer() {
    timeLeft--;
    timeLeftElement.textContent = timeLeft;

    if (timeLeft <= 0) {
        // Time's up!
        clearInterval(timer);
        doneButton.style.display = 'none';
        startButton.style.display = 'inline-block';
        firstNameInput.disabled = true;
        lastNameInput.disabled = true;
        phoneNumberInput.disabled = true;
        emailInput.disabled = true;

        if (!firstNameInput.value.trim() || !lastNameInput.value.trim() || !phoneNumberInput.value.trim() || !emailInput.value.trim()) {
            // Caller profile not filled
            showPopup('Oops! Time\'s up! Please fill out the caller profile.');
            activityCounter = 1; // Reset activity counter for the next game
            activityCounterElement.textContent = `${activityCounter} out of ${totalActivities} activities`;
            clearCallerProfile();
        }
    }
}

// Function to check if the user copied correctly
function checkResult() {
    if (doneButton.style.display !== 'none') { // Only check if the Done button is visible
        const inputFirstName = firstNameInput.value.trim().toLowerCase();
        const inputLastName = lastNameInput.value.trim().toLowerCase();
        const inputPhoneNumber = phoneNumberInput.value.trim();
        const inputEmail = emailInput.value.trim().toLowerCase();

        const callerFirstName = callerInfo.name.split(' ')[0].toLowerCase();
        const callerLastName = callerInfo.name.split(' ')[1].toLowerCase();

        if (
            inputFirstName === callerFirstName &&
            inputLastName === callerLastName &&
            inputPhoneNumber === callerInfo.phoneNumber &&
            inputEmail === callerInfo.email
        ) {
            resultMessageElement.textContent = 'Yay! You copied correctly!';

            setTimeout(() => {
                resultMessageElement.textContent = '';
                activityCounterElement.textContent = `${activityCounter} out of ${totalActivities} activities`;
                activityCounter++;
                if (activityCounter > totalActivities) {
                    // Game completed
                    doneButton.style.display = 'none';
                    startButton.style.display = 'inline-block';
                    activityCounter = 1; // Reset activity counter for the next game
                    activityCounterElement.textContent = `${activityCounter} out of ${totalActivities} activities`;
                } else {
                    // Generate new random caller information for the next activity
                    callerInfo = generateRandomCallerInfo();
                    setCallerInformation();
                    clearCallerProfile();
                    // Start the timer for the next activity
                    timeLeft = 20;
                    timeLeftElement.textContent = timeLeft;
                    clearInterval(timer);
                    timer = setInterval(updateTimer, 1000);
                }
            }, 1000);
        } else {
            resultMessageElement.textContent = 'Oops! Try again.';
            setTimeout(() => {
                resultMessageElement.textContent = '';
            }, 1000);
        }
    }
}

// Function to show a big pop-up message
function showPopup(message) {
    const popupElement = document.createElement('div');
    popupElement.className = 'popup';
    popupElement.textContent = message;

    document.body.appendChild(popupElement);

    setTimeout(() => {
        popupElement.remove();
    }, 3000);
}

// Event listeners
startButton.addEventListener('click', startGame);
doneButton.addEventListener('click', checkResult);
firstNameInput.addEventListener('input', checkResult);
lastNameInput.addEventListener('input', checkResult);
phoneNumberInput.addEventListener('input', checkResult);
emailInput.addEventListener('input', checkResult);




