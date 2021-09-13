
var generateBtn = document.querySelector('#generate');

const special = ["!", "\"", "\#", "$", "%", "&", "\'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "]", "^", "_", "`", "{", "|", "}", "~"];
const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const lower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const upper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// Write password length to the #password input alert
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

function generatePassword() {
  // get password length from user input
  var passwordLength = parseInt(window.prompt("Set desired length of your password (between 8 and 128 characters): "));
  // keep asking for user input whilst input is invalid 
  while (passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength)) {
    passwordLength = parseInt(window.prompt("Set desired length of your password (between 8 and 128 characters): "));
  }
  // Get booleans from user input for which types of characters will be used in password
  var useSpecial = window.confirm("Would you want to include special characters in your password?");
  var useNumber = window.confirm("Would you want to include numbers in your password?");
  var useLower = window.confirm("Would you want to user lowercase characters in your password?");
  var useUpper = window.confirm("Would you want to use uppercase characters in your password?");

  //if none of the options are chosen, make user choose again with all prompts/alerts
  while (useSpecial === false && useNumber === false && useLower === false && useUpper === false) {
    window.alert("Atleast one option must be chosen ok, please choose again.")
    useSpecial = window.confirm("Do you want to include special characters?");
    useNumber = window.confirm("Do you want to include numbers?");
    useLower = window.confirm("Do you want to user lowercase characters?");
    useUpper = window.confirm("Do you want to use uppercase characters?");
  }

  // create empty array, and then concat character arrays to their own index if their respected boolean is true
  var passwordChars = []
  var numDiffChars = 0;

  if (useSpecial) {
    passwordChars[numDiffChars] = special; //add special characters to next index
    numDiffChars++;
  } 
  if (useNumber) {
    passwordChars[numDiffChars] = number; //add numbers to next index
    numDiffChars++;
  } 
  if (useLower) {
    passwordChars[numDiffChars] = lower; //add lowercase characters next index
    numDiffChars++;
  }
  if (useUpper) {
    passwordChars[numDiffChars] = upper; //add uppercase characters next index
    numDiffChars++;
  }

  // create empty array and string
  var passwordArr = []
  var password = ""

  // add one random character from each chosen set to ensure at least one is included in final password
  // add each character to a random position in the array
  for (var i = 0; i < passwordChars.length; i++){
    passwordArr.splice(Math.floor(Math.random()*(passwordArr.length+1)), 0, passwordChars[i][Math.floor(Math.random()*passwordChars[i].length)]); 
  }


  // create values to store randomly chosen first and second indices 
  var firstIndex = 0;
  var secondInex = 0;
  // run code passwordLength - number of character sets times (as we've already added that many characters)
  // first randomly choosing which set of characters to use then randomly choosing which character
  // then add this value to a random position in the array
  for (var i = 0; i < (passwordLength-passwordChars.length); i++) {
    firstIndex = Math.floor(Math.random()*passwordChars.length);
    secondIndex = Math.floor(Math.random()*passwordChars[firstIndex].length);
    //add the value from passwordChars[firstindex][secondindex] to a random place in the passwordArr 
    passwordArr.splice(Math.floor(Math.random()*(passwordArr.length+1)), 0, passwordChars[firstIndex][secondIndex]);
  }

  // convert random password array into a string
  for (var i = 0; i < passwordArr.length; i++) {
    password += passwordArr[i];
  }

  // return randomly generated password string
  return password;

}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);