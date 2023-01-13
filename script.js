//const { isBooleanObject } = require("util/types");

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
let allCharacters = specialCharactersArray.concat(numericCharactersArray).concat(lowerCasedCharactersArray).concat(upperCasedCharactersArray)

// Function to prompt user for password options
function getPasswordOptions() {
  let criteria = {};
  let correctCriteria = true;
  let lengthOfPassword;
  let sum;
  let allCriteria = {};

  while(correctCriteria) {

    // Prompts for password criteria
    lengthOfPassword = parseInt(prompt("Enter the length of your password, any number beween 10 and 64: "));
    
    let lowerCaseAnswer = prompt("Enter a minimum number of lower case letters: ");
    criteria.lowerCase = [parseInt(lowerCaseAnswer)];
    criteria.lowerCase.push(lowerCasedCharactersArray);

    let upperCaseAnswer = prompt("Enter a minimum number of upper case letters: ");
    criteria.upperCase = [parseInt(upperCaseAnswer)];
    criteria.upperCase.push(upperCasedCharactersArray);

    let numbersAnswer = prompt("Enter a minimum number of numbers: ");  
    criteria.numbers = [parseInt(numbersAnswer)];
    criteria.numbers.push(numericCharactersArray);

    let specialCharactersAnswer = prompt("Enter a minimum number of special characters: ");
    criteria.specialCharacters = [parseInt(specialCharactersAnswer)];
    criteria.specialCharacters.push(specialCharactersArray);
    
    // Sum of all user inputs to compare with the length of password
    sum = criteria.lowerCase[0] + criteria.upperCase[0] + criteria.numbers[0] + criteria.specialCharacters[0];

    if (sum > lengthOfPassword) {
      let answer = confirm("According to your criteria, the length of password must be " + sum + ". Are you happy with this length?");
      if (answer === true) {
        criteria.lengthOfPassword = sum;
        correctCriteria = false;
      }
      else {
       alert('Enter another criteria for your password')
      }
    }
    else {
      correctCriteria = false;
    }
  }
  allCriteria =  {"Length of password": lengthOfPassword, "Sum of all prompts": sum, "Password criteria" : criteria};
  console.log("All criteria object: ", allCriteria);
  return allCriteria;
}

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

console.log(generatePasswordWithGivenLength(getPasswordOptions()["Password criteria"]));

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

// Function to generate password with user input
function generatePassword(allCriteria) {
  let password = generatePasswordWithGivenLength(allCriteria["Password criteria"])
  if (allCriteria["Length of password"] > allCriteria["Sum of all prompts"]) {
    let difference = allCriteria["Length of password"] - allCriteria["Sum of all prompts"];
    password += getRandomString(difference, allCharacters)
  }
  console.log(password.shuffle());
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

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);