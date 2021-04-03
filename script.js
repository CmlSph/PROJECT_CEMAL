// confirm("This application has been developed for education purposes only. May contain some irritating jokes. Please confirm to continue.");


let api = 'https://v2.jokeapi.dev/joke/'




function addSearchQuery() {
  const queryInput = document.getElementById("query");
  const searchQuery = `contains=${queryInput.value}&`
  // console.log(searchQuery);
  return searchQuery;
}

function addAmount() {
  const amountInput = document.getElementById("amount");
  const amountOfJokes = `amount=${amountInput.value}`
  console.log(amountOfJokes);
  return amountOfJokes;
}

function selectLanguage() {
  const languageInput = document.getElementById('language');
  const selectedLanguage = `?lang=${languageInput.value}`
  console.log(selectedLanguage);
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

function generateURLAndFetchData(){
  
    selectedCategories = (getSelectedCheckboxValues('category').toString());
    
    selectedBlacklists = (blacklistCheckboxValues('blacklist').toString());
    selectedType = (jokeTypeCheckboxValues('parts').toString());
    console.log(selectedType);
    
    const selectedTypeURLElement = `&type=${selectedType}&`
    console.log(selectedTypeURLElement)
    const blacklistURLElement = `&blacklistFlags=${selectedBlacklists}`
    console.log(selectedBlacklists);
    console.log(blacklistURLElement);
    console.log('selected categories are: ' + selectedCategories);
    
    const newQuery = addSearchQuery();
    console.log(newQuery);
    const amountOfJokes = addAmount();
    console.log(amountOfJokes);
    const selectedLanguage = selectLanguage();
    console.log(selectedLanguage)
    let url = api + selectedCategories + selectedLanguage + blacklistURLElement + selectedTypeURLElement + newQuery + amountOfJokes;
    console.log(url);
    return url
}   
generateURLAndFetchData()



const btn = document.querySelector('#btn');//Generate Jokes button!!!
btn.addEventListener('click', fetchData);


function valthisform(){
    var checkboxs=document.getElementsByName("category");
    var okay=false;
    for(var i=0,l=checkboxs.length;i<l;i++)
    {
        if(checkboxs[i].checked)
        {
            okay=true;
            break;
        }
    }
    if(!okay) alert("Please select a 'Category'!");
}
  






function fetchData(){
    
    valthisform()//Category
   
    const url = generateURLAndFetchData();
    console.log(url);
    fetch(url)
    .then (response => response.json())
    .then (jsonData => {
    console.log(jsonData)
    console.log(jsonData.error)
    selectedType = (jokeTypeCheckboxValues('parts').toString());
    console.log(selectedType)

      if (jsonData.error === true){
        const responseMessage = document.createElement('p')
        responseMessage.innerHTML = 'No jokes were found that match your provided filter(s).'
        console.log(responseMessage);
        responseMessage.style.color = "white";
        responseMessage.style.fontWeight = "bold";
        responseMessage.style.fontSize = '30px';
        responseMessage.style.fontFamily = "arial"
        responseMessage.style.backgroundColor = "blue";
        responseMessage.style.textAlign = "center";
        document.body.appendChild(responseMessage);
        
      }
    for (let i = 0; i < jsonData.jokes.length; i++){
      const button = document.createElement("button");//Selected joke button
      const div = document.createElement("div");
      const p = document.createElement("p");
      
      
      console.log(jsonData.jokes[i].setup)
      console.log(jsonData.jokes[i].delivery)
      
        
      button.innerText = jsonData.jokes[i].setup || jsonData.jokes[i].joke +  " " +  '(' + jsonData.jokes[i].category + ')'
      
      button.id = 'buttonAccordion'
      document.body.appendChild(button);
    
      
      p.innerText = jsonData.jokes[i].delivery || `Category:${jsonData.jokes[i].category}`;
      
      div.appendChild(p);
      document.body.appendChild(div);
      
      
      if (selectedType === 'single'){
        button.innerText = jsonData.jokes[i].joke;
        p.innerText = `Category:${jsonData.jokes[i].category}`;
      }
      else if (selectedType === 'twopart'){
        button.innerText = jsonData.jokes[i].setup +  " " +  '(' + jsonData.jokes[i].category + ')'
        p.innerText = jsonData.jokes[i].delivery;
      }
        button.addEventListener("click", function() {
      
        this.classList.toggle("active");
        var div = this.nextElementSibling;
        if (div.style.display === "block") {
          div.style.display = "none";
        } else {
          div.style.display = "block";
        } 
    })
    
  }
}).catch(error => {
  console.log(error)// Not deleted intentionally!!!
  // const errorElement = document.createElement('p');
  // document.body.appendChild(errorElement);
  // const potentialError = `Either no jokes were found that match your provided filter(s)
  // or you didn't select a category! 
  // ${error}`
  
  // errorElement.innerHTML = potentialError;
  // errorElement.style.color = "white";
  // errorElement.style.fontWeight = "bold";
  // errorElement.style.fontSize = '30px';
  // errorElement.style.fontFamily = "arial"
  // errorElement.style.backgroundColor = "red";
  // errorElement.style.textAlign = "center";
  // console.log(errorElement);
  
})
  
  
};




const reloadButton = document.querySelector("#reload");
// Reload everything:
function reload() {
    reload = location.reload();
}
// Event listeners for reload
reloadButton.addEventListener("click", reload);


