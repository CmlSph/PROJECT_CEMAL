Here are the general requirements.

The app needs to be a single-page application. That means only one index.html file and JavaScript needs to update the HTML using DOM manipulation.
The app needs to interact with an API to grab data.
The app needs to have loading/error handling for the interaction with the API.
The app needs some user interaction such that you need to grab different data from the API. So you cannot just grab everything from the API and store it locally.

Specific requirements for the JOKEAPI

MUST-HAVES

1. It should be a single-page application.
2. The App interacts with JokeAPI. (<https://v2.jokeapi.dev/>)
3. The user should be able to make a selection from a list of categories.
4. The user should be able to determine the number of jokes that are to be returned.
5. The user should be able to choose a language for the jokes.
6. The user should be able to see a message if there are no jokes available regarding the selected filter
7. The response should be presented as nicely formatted and dynamically created HTML

NICE-TO-HAVES

8. The user can add a blacklist to the search query (to make sure that unwanted jokes will not appear) (nsfw, religious, political, racist, sexist, explicit)
9. The user can search for a joke that contains a specific search string.
