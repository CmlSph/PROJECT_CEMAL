// confirm("This application has been developed for education purposes only. May contain some irritating jokes. Please confirm to continue.");
const api = 'https://v2.jokeapi.dev/joke/'

function addSearchQuery() {
  const queryInput = document.getElementById("query");
  const searchQuery = `contains=${queryInput.value}&`
  return searchQuery;
}

function addAmount() {
  const amountInput = document.getElementById("amount");
  const amountOfJokes = `amount=${amountInput.value}`
  return amountOfJokes;
}

function selectLanguage() {
  const languageInput = document.getElementById('language');
  const selectedLanguage = `?lang=${languageInput.value}`
  return selectedLanguage;
}

function getSelectedCheckboxValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    let values = [];
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.value);
    });
    return values;
}

function blacklistCheckboxValues(name) {
  const blacklistCheckboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  let blacklistValues = [];
  blacklistCheckboxes.forEach((checkbox) => {
    blacklistValues.push(checkbox.value);
  });
  return blacklistValues;
}

function jokeTypeCheckboxValues(name) {
  const jokeTypesValues = document.querySelectorAll(`input[name="${name}"]:checked`);
  
  let jokeTypes = [];
  jokeTypesValues.forEach((checkbox) => {
    jokeTypes.push(checkbox.value);
  });
  return jokeTypes;
}

function generateURL(){
  
    selectedCategories = (getSelectedCheckboxValues('category').toString());
    selectedBlacklists = (blacklistCheckboxValues('blacklist').toString());
    selectedType = (jokeTypeCheckboxValues('parts').toString());
    
    const selectedTypeURLElement = `&type=${selectedType}&`
    const blacklistURLElement = `&blacklistFlags=${selectedBlacklists}`
    const newQuery = addSearchQuery();
    const amountOfJokes = addAmount();
    const selectedLanguage = selectLanguage();
    
    let url = api + selectedCategories + selectedLanguage + blacklistURLElement + selectedTypeURLElement + newQuery + amountOfJokes;
    
    return url
}   

const buttonGenerateJokes = document.querySelector('#btn');//Generate Jokes button!!!
buttonGenerateJokes.addEventListener('click', fetchData);

function checkIfACategoryIsSelected(){
    const checkboxes = document.getElementsByName("category");
    let selected = false;
    for(let i = 0; i < checkboxes.length; i++)
    {
        if(checkboxes[i].checked)
        {
            selected = true;
            break;
        }
    }
    if(!selected) {
    
    document.querySelector('#btn').innerText = "Please select a category"
    document.querySelector('#btn').style.backgroundColor = 'red';
    setTimeout(function(){ 
      
      document.querySelector('#btn').innerText = "Generate Jokes"
      document.querySelector('#btn').style.backgroundColor = 'rgb(12, 1, 37)';
      ;
    }, 1000);
}}
  
const container = document.createElement('main');
document.body.appendChild(container);
const responseMessageContainer = document.createElement('main');
document.body.appendChild(responseMessageContainer);

function fetchData(){
    container.innerHTML = '';
    responseMessageContainer.innerHTML = '';
    
    checkIfACategoryIsSelected()
   
    const url = generateURL();
    
    fetch(url)
    .then (response => response.json())
    .then (jsonData => {
    
     if (jsonData.error === true){
        const responseMessage = document.createElement('p')
        responseMessage.innerHTML = 'No jokes were found that match your provided filter(s).'
        responseMessage.id = 'responseMessage'
        responseMessageContainer.appendChild(responseMessage);
}
      
    for (let i = 0; i < jsonData.jokes.length; i++){
      
      const button = document.createElement("button");//Selected joke button
      const div = document.createElement("div");
      const p = document.createElement("p");
      container.appendChild(button);
      
      div.appendChild(p);
      container.appendChild(div);
      
      button.innerText = jsonData.jokes[i].setup || jsonData.jokes[i].joke +  " " +  '(' + jsonData.jokes[i].category + ')'
      button.id = 'buttonAccordion'
      
      p.innerText = jsonData.jokes[i].delivery || `Category:${jsonData.jokes[i].category}`;
      
      button.addEventListener("click", function() {
         
        this.classList.toggle("active");
        let div = this.nextElementSibling;
        if (div.style.display === "block") {
          div.style.display = "none";
        } else {
          div.style.display = "block";
          } 
      })
    }
}).catch(error => {
  console.log(error)
  })
};




// const reloadButton = document.querySelector("#reload");
// // Reload everything:
// function reload() {
//     reload = location.reload();
// }
// // Event listeners for reload
// reloadButton.addEventListener("click", reload);


