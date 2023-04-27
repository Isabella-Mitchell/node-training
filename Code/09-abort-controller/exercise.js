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
    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("This operation was aborted.");
    } else {
      console.log(error);
    }
  }
}

fetchFromUrl("https://jsonplaceholder.typicode.com/todos/1")
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

setTimeout(() => {
  fetchFromUrl("https://swapi.dev/api/films")
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}, 10);
