//event listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
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
  console.log(data);

  document.querySelector("#city").innerHTML = data.city;
  document.querySelector("#Latitude").innerHTML = data.latitude;
  document.querySelector("#Longitude").innerHTML = data.longitude;

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

function validateForm(e) {
  let isValid = true;
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  let passwordAgain = document.querySelector("#passwordAgain").value;
  document.querySelector("#usernameError").innerHTML = "";
  document.querySelector("#suggestedPwd").innerHTML = "";
  document.querySelector("#passwordError").innerHTML = "";

  if (username.length == 0) {
    document.querySelector("#usernameError").innerHTML = "Username Required!";
    isValid = false;
  }
  if (password.length < 6) {
    document.querySelector("#suggestedPwd").innerHTML = "Password needs to be at least 6 characters!";
    isValid = false;
  }
  if (password !== passwordAgain) {
    document.querySelector("#passwordError").innerHTML = "Passwords do not match!";
    isValid = false;
  }

  if (!isValid) {
    e.preventDefault();

  }
}