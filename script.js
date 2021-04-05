// confirm("This application has been developed for education purposes only. May contain some irritating jokes. Please confirm to continue.");
const apiURL = "https://v2.jokeapi.dev/joke/";

function getSelectedCheckboxValues(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  let values = [];
  checkboxes.forEach((checkbox) => {
    values.push(checkbox.value);
  });
  return values;
}

function checkIfACategoryIsSelected() {
  const checkboxes = document.getElementsByName("category");
  let selected = false;
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      selected = true;
      break;
    }
  }
  if (!selected) {
    document.querySelector("#btn").innerText = "Please select a category";
    document.querySelector("#btn").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("#btn").innerText = "Generate Jokes";
      document.querySelector("#btn").style.backgroundColor = "rgb(12, 1, 37)";
    }, 1000);
  }
  return selected;
}

function addSearchQuery() {
  const queryInput = document.getElementById("query");
  const searchQuery = queryInput.value ? `contains=${queryInput.value}&` : "";
  return searchQuery;
}

function selectAmount() {
  const amountInput = document.getElementById("amount");
  const amountOfJokes = `amount=${amountInput.value}`;
  return amountOfJokes;
}

function selectLanguage() {
  const languageInput = document.getElementById("language");
  const selectedLanguage = languageInput.value
    ? `?lang=${languageInput.value}`
    : `?lang=en`;
  return selectedLanguage;
}

function generateURL() {
  selectedCategories = getSelectedCheckboxValues("category").toString();
  selectedBlacklists = getSelectedCheckboxValues("blacklist").toString();
  selectedType = getSelectedCheckboxValues("parts").toString();

  const selectedTypeURLElement = `&type=${selectedType}&`;
  const blacklistURLElement = `&blacklistFlags=${selectedBlacklists}`;
  const newQuery = addSearchQuery();
  const amountOfJokes = selectAmount();
  const selectedLanguage = selectLanguage();

  let url =
    apiURL +
    selectedCategories +
    selectedLanguage +
    blacklistURLElement +
    selectedTypeURLElement +
    newQuery +
    amountOfJokes;

  return url;
}
const container = document.createElement("main");
document.body.appendChild(container);
const responseMessageContainer = document.createElement("main");
document.body.appendChild(responseMessageContainer);

function fetchData() {
  container.innerHTML = "";
  responseMessageContainer.innerHTML = "";

  const selected = checkIfACategoryIsSelected();

  if (!selected) {
    return;
  }

  const url = generateURL();

  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => {
      if (jsonData.error) {
        const responseMessage = document.createElement("p");
        responseMessage.innerHTML =
          "No jokes were found that match your provided filter(s).";
        responseMessage.id = "responseMessage";
        responseMessageContainer.appendChild(responseMessage);
        return;
      }
      for (let i = 0; i < jsonData.jokes.length; i++) {
        const jokesButton = document.createElement("button");
        const containerParaAnswer = document.createElement("div");
        const paraAnswer = document.createElement("p");
        container.appendChild(jokesButton);

        containerParaAnswer.appendChild(paraAnswer);
        container.appendChild(containerParaAnswer);

        jokesButton.innerText =
          jsonData.jokes[i].setup ||
          jsonData.jokes[i].joke + " " + "(" + jsonData.jokes[i].category + ")";
        jokesButton.id = "buttonAccordion";

        paraAnswer.innerText =
          jsonData.jokes[i].delivery ||
          `Category:${jsonData.jokes[i].category}`;

        jokesButton.addEventListener("click", function () {
          this.classList.toggle("active");
          let containerParaAnswer = this.nextElementSibling;
          if (containerParaAnswer.style.display === "block") {
            containerParaAnswer.style.display = "none";
          } else {
            containerParaAnswer.style.display = "block";
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function main() {
  const buttonGenerateJokes = document.querySelector("#btn");
  buttonGenerateJokes.addEventListener("click", fetchData);
}

window.onload = main();
