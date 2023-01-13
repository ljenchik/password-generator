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
  let passwordCriteria = {};
  let lengthOfPassword;
  let sum;
  let allCriteria = {};
  let nextPrompt = false;

    // Prompts for password criteria
    while (!nextPrompt) {
      let passwordPromptLength = parseInt(prompt("Enter the length of your password, any number between 10 and 64: "));
      if (passwordPromptLength && (typeof passwordPromptLength === "number") && passwordPromptLength >= 10 && passwordPromptLength <= 64) {
        lengthOfPassword = passwordPromptLength;
        nextPrompt = true;
      }
      else {
        alert("Enter the length of your password, any number between 10 and 64: ");
      }
    }



    
    let lowerCaseAnswer = prompt("Enter a minimum number of lower case letters: ");
    passwordCriteria.lowerCase = [parseInt(lowerCaseAnswer)];
    passwordCriteria.lowerCase.push(lowerCasedCharactersArray);

    let upperCaseAnswer = prompt("Enter a minimum number of upper case letters: ");
    passwordCriteria.upperCase = [parseInt(upperCaseAnswer)];
    passwordCriteria.upperCase.push(upperCasedCharactersArray);

    let numbersAnswer = prompt("Enter a minimum number of numbers: ");  
    passwordCriteria.numbers = [parseInt(numbersAnswer)];
    passwordCriteria.numbers.push(numericCharactersArray);

    let specialCharactersAnswer = prompt("Enter a minimum number of special characters: ");
    passwordCriteria.specialCharacters = [parseInt(specialCharactersAnswer)];
    passwordCriteria.specialCharacters.push(specialCharactersArray);
    
    // Sum of all user inputs to compare with the length of password
    sum = passwordCriteria.lowerCase[0] + passwordCriteria.upperCase[0] + passwordCriteria.numbers[0] + passwordCriteria.specialCharacters[0];
    
    allCriteria =  {passwordLength: lengthOfPassword, sum: sum, options : passwordCriteria};
    return allCriteria;
  }

console.log(getPasswordOptions());

// Function for verification of password options
// function verifyPasswordOptions(allCriteria) {
//   if (allCriteria.passwordLength < 10 || allCriteria.passwordLength > 64) {
//     alert("Password length must be between 10 and 64");
//   }
//   else if (allCriteria.sum > 64) {
//     alert("Password length must be between 10 and 64");
//   }
//   else if (allCriteria.options.lowerCase[0] < 1 )




// };

//     if (sum > lengthOfPassword) {
//       let answer = confirm("According to your criteria, the length of password must be " + sum + ". Are you happy with this length?");
//       if (answer === true) {
//         criteria.lengthOfPassword = sum;
//         correctOptions = false;
//       }
//       else {
//        alert('Enter another criteria for your password')
//       }
//     }
//     else {
//       correctOptions = false;
//     }
//   }

// }





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

allCriteria = getPasswordOptions();
writePassword(allCriteria );

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
