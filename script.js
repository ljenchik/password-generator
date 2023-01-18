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

let allCharacters = lowerCasedCharactersArray
  .concat(upperCasedCharactersArray)
  .concat(numericCharactersArray)
  .concat(specialCharactersArray);

// Function to prompt user for password options and to verfy if user's password length prompt is a number
function getPasswordOptions() {
  let passwordCriteria = [];

  // Prompts for password criteria
  let nextPrompt = false;

  // Regex expression for an integer
  let regexInteger = /^[-+]?\d*$/;

  // Regex expression for a decimal
  let regexDecimal = /^\d*\.?\d*$/;

  let passwordPromptLength;


  while (!nextPrompt) {
    passwordPromptLength = prompt(
      "Enter the length of your password, any number between 10 and 64: "
    );
    passwordPromptLength = passwordPromptLength ? passwordPromptLength.trim() : "";
    console.log(passwordPromptLength);
    if (
      regexInteger.test(passwordPromptLength) &&
      parseInt(passwordPromptLength) >= 10 &&
      parseInt(passwordPromptLength) <= 64
    ) {
      passwordLength = passwordPromptLength;
      nextPrompt = true;
    } else {
      if (
        regexInteger.test(passwordPromptLength) &&
        parseInt(passwordPromptLength) < 10
      ) {
        alert(
          `${passwordPromptLength} is less than 10. Enter an integer between 10 and 64`
        );
      } else if (
        regexInteger.test(passwordPromptLength) &&
        parseInt(passwordPromptLength) > 64
      ) {
        alert(
          `${passwordPromptLength} is more than 64. Enter an integer between 10 and 64`
        );
      } else if (
        passwordPromptLength &&
        regexDecimal.test(passwordPromptLength)
      ) {
        alert(
          `${passwordPromptLength} is a decimal. Enter an integer between 10 and 64`
        );
      } else if (!passwordPromptLength.trim()) {
        alert(`Your input is empty. Enter an integer between 10 and 64`);
      } else {
        alert(
          `Your input \"${passwordPromptLength}\" is not an integer. Enter an integer between 10 and 64`
        );
      }
    }
  }

  // Add password length to the output array
  passwordCriteria.push(passwordLength);

  let lowerCaseAnswer = confirm(
    `You password will have ${passwordLength} characters. Do you want to include lower case letters in your password?`
  );
  if (lowerCaseAnswer) {
    passwordCriteria.push(lowerCasedCharactersArray);
    passwordCriteria.push(getRandom(lowerCasedCharactersArray));
  }

  let upperCaseAnswer = confirm(
    "Do you want to include upper case letters in your password?"
  );
  if (upperCaseAnswer) {
    passwordCriteria[1] = passwordCriteria[1].concat(upperCasedCharactersArray);
    passwordCriteria[2] = passwordCriteria[2].concat(
      getRandom(upperCasedCharactersArray)
    );
  }

  let numericAnswer = confirm(
    "Do you want to include numbers in your password?"
  );
  if (numericAnswer) {
    passwordCriteria[1] = passwordCriteria[1].concat(numericCharactersArray);
    passwordCriteria[2] = passwordCriteria[2].concat(
      getRandom(numericCharactersArray)
    );
  }

  let specialCharactersAnswer = confirm(
    "Do you want to include special characters in your password?"
  );
  if (specialCharactersAnswer) {
    passwordCriteria[1] = passwordCriteria[1].concat(specialCharactersArray);
    passwordCriteria[2] = passwordCriteria[2].concat(
      getRandom(specialCharactersArray)
    );
  }

  // The passwordCriteria is an array with 3 elements, the first is a password length (integer),
  //the second is an array of possible characters, the third one is the generated beginning of the password
  if (!passwordCriteria[2]) {
    passwordCriteria = [passwordLength, allCharacters, ""]
  }
  return passwordCriteria;
}

// Function for getting a random element from an array
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Function for getting a random integer from 0 to n - 1 inclusive
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
function generatePassword(passwordCriteria) {
  let password = "";
  let remainder = passwordCriteria[0] - passwordCriteria[2].length;
  if (remainder < passwordCriteria[0]) {
    for (let i = 0; i < remainder; i++) {
      password += getRandom(passwordCriteria[1]);
    }
  } else {
    for (let i = 0; i < remainder; i++) {
      password += getRandom(allCharacters);
    }
  }

  return shuffle(passwordCriteria[2] + password);
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword(passwordCriteria) {
  var password = generatePassword(passwordCriteria);
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

passwordCriteria = getPasswordOptions();
writePassword(passwordCriteria);

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
