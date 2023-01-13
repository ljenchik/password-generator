// Array of special characters to be included in password
let specialCharactersArray = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
let numericCharactersArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
let lowerCasedCharactersArray = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
let upperCasedCharactersArray = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Array of all characters
let allCharacters = specialCharactersArray.concat(numericCharactersArray).concat(lowerCasedCharactersArray).concat(upperCasedCharactersArray);


// Function to prompt user for password options and to verfy if user's prompt is a number
function getPasswordOptions() {
  let passwordCriteria = [];
  let lengthOfPassword;
  let nextPrompt = false;

    // Prompts for password criteria
    while (!nextPrompt) {
      let passwordPromptLength = parseInt(prompt("Enter the length of your password, any number between 10 and 64: "));
      if (passwordPromptLength && (typeof passwordPromptLength === "number") && passwordPromptLength >= 10 && passwordPromptLength <= 64) {
        lengthOfPassword = passwordPromptLength;
        nextPrompt = true;
      }
    }

    passwordCriteria.push({passwordLength: lengthOfPassword})
    
    let lowerCaseAnswer = confirm("Do you want to include lower case letters in to your password?");
    passwordCriteria.push({lowerCaseLetters: lowerCaseAnswer});
    

    let upperCaseAnswer = confirm("Do you want to include upper case letters in to your password?");
    passwordCriteria.push({upperCaseLetters: upperCaseAnswer});

    let numbersAnswer = confirm("Do you want to include numbers in to your password?");
    passwordCriteria.push({numbers: numbersAnswer});

    let specialCharactersAnswer = confirm("Do you want to include special characters in to your password?");
    passwordCriteria.push({numbers: specialCharactersAnswer});

    return passwordCriteria;
  }

console.log(getPasswordOptions());

// Function for getting a random element from an array
function getRandom(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}

// Function for getting a random string with a given length n from an array
function getRandomString(n, arr) {
  let randomString = "";
  for (let i = 0; i < n; i++) {
    randomString += getRandom(arr);
  }
  return randomString;
}

// Function to generate password with the password length which exactly equals to the sum of all user inputs
function generatePasswordWithGivenLength (passwordCriteria) {
  let password = "";
  for (const property in passwordCriteria) {
    password += getRandomString(passwordCriteria[property][0], passwordCriteria[property][1])
  } 
  return password;
}

// Function to shupple a string
String.prototype.shuffle = function () {
  var a = this.split(""),
      n = a.length;

  for(var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
  }
  return a.join("");
}

// Function to generate password with user inputs
function generatePassword(allCriteria) {
  let password = generatePasswordWithGivenLength(allCriteria["Password criteria"])
  if (allCriteria["Length of password"] > allCriteria["Sum of all prompts"]) {
    let difference = allCriteria["Length of password"] - allCriteria["Sum of all prompts"];
    password += getRandomString(difference, allCharacters)
  }
  console.log("Shuffled password ", password.shuffle());
  return password.shuffle();
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword(allCriteria) {
  var password = generatePassword(allCriteria);
  console.log(password);
  var passwordText = document.querySelector('#password');
  passwordText.value = password;
}

//allCriteria = getPasswordOptions();
//writePassword(allCriteria );

// Add event listener to generate button
//generateBtn.addEventListener('click', writePassword);
