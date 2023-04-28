const fetch = require("node-fetch")();

let currentController = null;

async function fetchFromUrl(url) {
  // Check if there is an abort controller and abort if there is

  if (currentController) {
    currentController.abort();
  }

  // Create a new AbortController for the new fetch request
  currentController = new AbortController();

  // Do some fetching

  try {
    const response = await fetch(url, { signal: currentController.signal });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("This op was aborted");
    } else {
      console.log(error);
    }
    return;
  }

  // Reset the currentController after the fetch request is completed
  currentController = null;
}
//

fetchFromUrl("https://jsonplaceholder.typicode.com/todos/1")
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

setTimeout(() => {
  fetchFromUrl("https://jsonplaceholder.typicode.com/todos/2")
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}, 1000);
