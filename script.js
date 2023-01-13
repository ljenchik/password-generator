// Array of special characters to be included in password
let specialCharactersArray = [
  "@",
  "%",
  "+",
  "\\",
  "/",
  "'",
  "!",
  "#",
  "$",
  "^",
  "?",
  ":",
  ",",
  ")",
  "(",
  "}",
  "{",
  "]",
  "[",
  "~",
  "-",
  "_",
  ".",
];

// Array of numeric characters to be included in password
let numericCharactersArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Array of lowercase characters to be included in password
let lowerCasedCharactersArray = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

// Array of uppercase characters to be included in password
let upperCasedCharactersArray = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// Array of all characters
let allCharacters = specialCharactersArray
  .concat(numericCharactersArray)
  .concat(lowerCasedCharactersArray)
  .concat(upperCasedCharactersArray);

// Function to prompt user for password options and to verfy if user's password length prompt is a number
function getPasswordOptions() {
  let passwordCriteria = [];
  let nextPrompt = false;

  // Prompts for password criteria
  while (!nextPrompt) {
    let passwordPromptLength = parseInt(
      prompt(
        "Enter the length of your password, any number between 10 and 64: "
      )
    );
    if (
      passwordPromptLength &&
      typeof passwordPromptLength === "number" &&
      passwordPromptLength >= 10 &&
      passwordPromptLength <= 64
    ) {
      passwordLength = passwordPromptLength;
      nextPrompt = true;
    }
  }

  let lowerCaseAnswer = confirm(
    "Do you want to include lower case letters in to your password?"
  );
  passwordCriteria.push({
    lowerCaseLetters: [lowerCaseAnswer, lowerCasedCharactersArray],
  });

  let upperCaseAnswer = confirm(
    "Do you want to include upper case letters in to your password?"
  );
  passwordCriteria.push({
    upperCaseLetters: [upperCaseAnswer, upperCasedCharactersArray],
  });

  let numericAnswer = confirm(
    "Do you want to include numbers in to your password?"
  );
  passwordCriteria.push({ numbers: [numericAnswer, numericCharactersArray] });

  let specialCharactersAnswer = confirm(
    "Do you want to include special characters in to your password?"
  );
  passwordCriteria.push({
    specialCharacters: [specialCharactersAnswer, specialCharactersArray],
  });

  return [passwordLength, passwordCriteria];
}

// Function for getting a random element from an array
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(n) {
  return Math.floor(Math.random() * n);
}

// Function to shupple a string
function shuffle(s) {
  let arr = s.split("");
  let n = arr.length;
  for (var i = 0; i < n - 1; ++i) {
    var j = getRandomInt(n);
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  s = arr.join("");
  return s;
}

// Function to generate password with user inputs
function generatePassword(passwordLength, passwordCriteria) {
  let password = "";
  let passwordCharactersToChoose = [];

  for (const element of passwordCriteria) {
    if (Object.values(element)[0][0]) {
      password += getRandom(Object.values(element)[0][1]);
      passwordCharactersToChoose.push(...Object.values(element)[0][1]);
    }
  }

  let remainder = passwordLength - password.length;
  if (remainder < passwordLength) {
    for (let i = 0; i < remainder; i++) {
      password += getRandom(passwordCharactersToChoose);
    }
  } 
  // Returns password which contains random characters from all arrays
  else {
    for (let i = 0; i < remainder; i++) {
      password += getRandom(allCharacters);
    }
  }
  return shuffle(password);
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword(passwordLength, passwordCriteria) {
  var password = generatePassword(passwordLength, passwordCriteria);
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

passwordCriteria = getPasswordOptions();
writePassword(passwordCriteria[0], passwordCriteria[1]);

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
