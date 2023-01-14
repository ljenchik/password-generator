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
  let output = [];
  let passwordCriteria = [];

  // Prompts for password criteria
  let nextPrompt = false;

  // Regex expression for an integer
  let regexInteger = /(?<=\s|^)\d+(?=\s|$)/g;

  // Regex expression for a decimal
  let regexDecimal = /^\d*\.?\d*$/g;

  let passwordPromptLength;

  while (!nextPrompt) {
    passwordPromptLength = (
      prompt(
        "Enter the length of your password, any number between 10 and 64: "
      )
    );
    if (
      regexInteger.test(passwordPromptLength) &&
      parseInt(passwordPromptLength) >= 10 &&
      parseInt(passwordPromptLength) <= 64
    ) {
      passwordLength = passwordPromptLength;
      nextPrompt = true;
    }
    else {
      if (
        regexInteger.test(passwordPromptLength) &&
        parseInt(passwordPromptLength) < 10 
      ) {
        alert(`${passwordPromptLength} is less than 10. Enter an integer between 10 and 64`);
      }
      else if (
        regexInteger.test(passwordPromptLength) &&
        parseInt(passwordPromptLength) > 64  
      ) {
        alert(`${passwordPromptLength} is more than 64. Enter an integer between 10 and 64`);
      }
      else if (passwordPromptLength && regexDecimal.test(passwordPromptLength)) {
        alert(`${passwordPromptLength} is a decimal. Enter an integer between 10 and 64`);
      }
      else if (!passwordPromptLength.trim()) {
        alert("Your input is empty. Enter an integer between 10 and 64");
      }
      else {
        alert(`Your input \"${passwordPromptLength}\" is not an integer. Enter an integer between 10 and 64`);
      }
    }
  }

  // Add password length to the output array
  output.push(passwordLength);

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

  output.push(passwordCriteria);

  // The output is an array with 2 elements, the first is a password length (integer), the second is array of objects
  return output;
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
function generatePassword(length, options) {
  let password = "";
  let passwordCharactersToChoose = [];

  for (const element of options) {
    if (Object.values(element)[0][0]) {
      password += getRandom(Object.values(element)[0][1]);
      passwordCharactersToChoose.push(...Object.values(element)[0][1]);
    }
  }

  let remainder = length - password.length;
  if (remainder < length) {
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
function writePassword(length, options) {
  var password = generatePassword(length, options);
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

passwordCriteria = getPasswordOptions();
writePassword(passwordCriteria[0], passwordCriteria[1]);

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
