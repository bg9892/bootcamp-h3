// Assignment Code
var generateBtn = document.querySelector("#generate");
var slide = document.querySelector("#slider");
var slideVal = 50;

//gets the slider value displays this value to the html page
document.querySelector("#slider").oninput = function () {
  slideVal = document.querySelector("#slider").value;        
  document.querySelector('#slideValue').innerHTML = slideVal;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
function writePassword() {

  var passwordLength = slideVal;

  if (passwordLength < 8 || passwordLength > 128) {
    return false;
  }

  // Call passwordCriteria and store result 
  var passwordCriteriaArray = passwordCriteria();

  // Call the atLeastOneCriteria function and store true or false value in noCriteriaPicked.
  var noCriteriaPicked = passwordCriteriaArray.every(atLeastOneCriteria);

  // Loops through passwordCriteriaArray and checks if all elements are false. If they are, it returns true else it returns false.
  function atLeastOneCriteria(criteria) {

    return criteria === false;
  }

  // if noCriteria is true prompt user to pick at least one.
  if (noCriteriaPicked) {
    alert("You must pick at least one.");
    return false
  }

  var password = generatePassword(passwordLength, passwordCriteriaArray);
  document.querySelector("#password").value = password;
}

// Function to generate password.
function generatePassword(passwordLength, passwordCriteria) {

  var charset = "";
  var password = "";
  var characterArray = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789", "!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]

  // Loop through passwordCriteria (type of characters user picked) then set charset to elements in characterArray.
  for (var i = 0; i < characterArray.length; i++) {
    if (passwordCriteria[i]) {
      charset += characterArray[i];
    }
  }

  // Picks a random character in charset and adds it to password variable up to the number of characters the user decides. 
  for (var i = 0; i < passwordLength; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  return password;
}

// Confirm user password criteria and return the result as an array.
function passwordCriteria() {

  var lowercase = document.querySelector("#lowercaseChecked").checked;
  var uppercase = document.querySelector("#uppercaseChecked").checked;
  var numeric = document.querySelector("#numbersChecked").checked;
  var specialCharacters = document.querySelector("#specialChecked").checked;

  return [lowercase, uppercase, numeric, specialCharacters];
}

