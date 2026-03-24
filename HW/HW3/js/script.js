
//event listeners
document.querySelector("#personForm").addEventListener("submit", function (event) {
  validateForm(event);
});

function validateForm(event) {
  event.preventDefault();

  let quantity = document.querySelector("#quantity").value;

  if (quantity === "") {
    alert("Please select a quantity!");
    return;
  }

  generateUsers(quantity);
}

async function generateUsers(quantity) {
  let gender = document.querySelector("#gender").value;
  let gridContainer = document.querySelector("#grid-container");
  //resetting info
  gridContainer.innerHTML = "";
  document.querySelector("#info-text").style.display="none";

  let url = ""
  switch (gender) {
    case "n":
      url = `https://fakerapi.it/api/v2/persons?_quantity=${quantity}`;
      break;

    case "f":
      url = `https://fakerapi.it/api/v2/persons?_quantity=${quantity}&_gender=female`;
      break;

    case "m":
      url = `https://fakerapi.it/api/v2/persons?_quantity=${quantity}&_gender=male`;
      break;

    default:
      console.log("error selecting gender");
      break;
  }
  let response = await fetch(url);
  let data = await response.json(response);

  for (let person of data.data) {
    gridContainer.innerHTML += `<div class="grid-item">
    <h2>${person.firstname + " " + person.lastname}</h2>
    <p><strong>Gender:</strong> ${person.gender}</p>
    <p><strong>Email:</strong> ${person.email}</p>
    <p><strong>Phone:</strong> ${person.phone}</p>
    <p><strong>Birthday:</strong> ${person.birthday}</p>
    </div>`;

    console.log(person);
    console.log("break");
  }
}