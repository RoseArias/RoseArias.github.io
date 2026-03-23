//event listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("focus", displayStates);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#password").addEventListener("click", generatePassword);

document.querySelector("#signupForm").addEventListener("submit", function (event) {
  validateForm(event);
});


//documents

//Display city from WebAPI after entering a zip code
async function displayCity() {
  let zipCode = document.querySelector("#zip").value;

  let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
  let response = await fetch(url);
  let data = await response.json();
  document.querySelector("#zipError").innerHTML = "";
  document.querySelector("#city").innerHTML = "";
  document.querySelector("#Latitude").innerHTML = "";
  document.querySelector("#Longitude").innerHTML = "";

  if (!data || data.length === 0) {
    document.querySelector("#zipError").innerHTML = "Zip code not found";
    return;
  }

  document.querySelector("#city").innerHTML = data.city;
  document.querySelector("#Latitude").innerHTML = data.latitude;
  document.querySelector("#Longitude").innerHTML = data.longitude;

}

//display states
async function displayStates() {
  let state = document.querySelector("#state")
  let url = "https://csumb.space/api/allStatesAPI.php";
  let response = await fetch(url);
  let data = await response.json();
  state.innerHTML = "<option value=''> Select One </option>";


  for (let index of data) {
    state.innerHTML += `<option value=${index.usps.toLowerCase()}> ${index.state} </option>`;
  }
}


//Display Counties from WebAPI based on the two-letter abbreviation of a state
async function displayCounties() {
  let state = document.querySelector("#state").value;
  if (!state || state.length === 0) {
    return;
  }

  let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
  let response = await fetch(url);
  let data = await response.json();

  let countryList = document.querySelector("#county");
  countryList.innerHTML = "<option> Select County </option>"
  for (let index = 0; index < data.length; index++) {
    countryList.innerHTML += `<option> ${data[index].county} </option>`;
  }
}

async function checkUsername() {
  let username = document.querySelector("#username").value;
  if (!username || username.length === 0) {
    return;
  }

  let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
  let response = await fetch(url);
  let data = await response.json(response);


  let usernameError = document.querySelector("#usernameError");
  if (data.available) {
    usernameError.innerHTML = " Username available!";
    usernameError.style.color = "green";
  } else {
    usernameError.innerHTML = " Username taken!";
    usernameError.style.color = "red";
  }

}
async function generatePassword(){

  let url = "https://csumb.space/api/suggestedPassword.php?length=8";
  let response = await fetch(url);
  let data = await response.json(response);

  let suggestedPwd = document.querySelector("#suggestedPwd");
  if(!suggestedPwd){
    return
  }
  document.querySelector("#suggestedPwd").innerHTML = `Suggested password: ${data.password}`;
  

}


function validateForm(e) {
  let isValid = true;
  let fname = document.querySelector("#fName").value;
  let lname = document.querySelector("#lName").value;
  let gender = document.querySelector('input[name="gender"]:checked');

  let zip = document.querySelector("#zip").value;
  let state = document.querySelector("#state").value;
  let county = document.querySelector("#county").value;

  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  let passwordAgain = document.querySelector("#passwordAgain").value;

  resetInnerHTML();

  if (fname.length == 0) {
    document.querySelector("#fNameError").innerHTML = "First Name Required!";
    document.querySelector("#fNameError").className = "bg-warning text-white";
    isValid = false;
  }

  if (lname.length == 0) {
    document.querySelector("#lNameError").innerHTML = "Last Name Required!";
    document.querySelector("#lNameError").className = "bg-warning text-white";
    isValid = false;
  }

  if (!gender) {
    document.querySelector("#genderError").innerHTML = "Gender Required!";
    document.querySelector("#genderError").className = "bg-warning text-white";
    isValid = false;
  }

  if (!zip) {
    document.querySelector("#zipError").innerHTML = "Zip Required!";
    document.querySelector("#zipError").className = "bg-warning text-white";
    isValid = false;
  }

  if (!state || state === "") {
    document.querySelector("#stateError").innerHTML += "State Required!";
    document.querySelector("#stateError").className = "bg-warning text-white";
    isValid = false;
  }

  if (!county || county === "") {
    document.querySelector("#countyError").innerHTML += "County Required!";
    document.querySelector("#countyError").className = "bg-warning text-white";
    isValid = false;
  }

  if (username.length == 0) {
    document.querySelector("#usernameError").innerHTML = "Username Required!";
    document.querySelector("#usernameError").className = "bg-warning text-white";
    isValid = false;
  }

  if (password.length < 6) {
    document.querySelector("#passwordError").innerHTML = "Password needs to be at least 6 characters!";
    document.querySelector("#passwordError").className = "bg-warning text-white";
    isValid = false;
  }

  if (password !== passwordAgain) {
    document.querySelector("#passwordAgainError").innerHTML = "Passwords do not match!";
    document.querySelector("#passwordAgainError").className = "bg-warning text-white";
    isValid = false;
  }

  if (!isValid) {
    e.preventDefault();
  }
}

function resetInnerHTML() {
  document.querySelector("#fNameError").innerHTML = "";
  document.querySelector("#lNameError").innerHTML = "";
  document.querySelector("#genderError").innerHTML = "";

  document.querySelector("#zipError").innerHTML = "";
  document.querySelector("#stateError").innerHTML = "";
  document.querySelector("#countyError").innerHTML = "";

  document.querySelector("#usernameError").innerHTML = "";
  document.querySelector("#passwordError").innerHTML = "";
  document.querySelector("#passwordAgainError").innerHTML = "";
}