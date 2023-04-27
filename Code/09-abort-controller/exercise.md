# Exercise: Create a Fetch Wrapper with Automatic Cancellation

# Objective:
In this exercise, you will create a fetchFromUrl function that automatically cancels any ongoing fetch request when a new request is made. This will (hopefully) help you understand how to use AbortController to manage and cancel fetch requests in Node.js, assuming a global fetch function is available.

# Instructions:

1. Create a fetchFromUrl function that takes a URL as an argument.

2. Implement the following behavior in the fetchFromUrl function:
  - If there is an ongoing fetch request, cancel it using an AbortController.
  - Create a new fetch request using the provided URL and a new AbortController instance.
  - If the fetch request is successful, return the JSON data from the response.
  - If the fetch request is aborted, log a message indicating the previous request was aborted.
  - If there's any other error, log the error message.

3. Test the fetchFromUrl function using the following example usage:

```javascript
fetchFromUrl("https://jsonplaceholder.typicode.com/todos/1")
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

setTimeout(() => {
  fetchFromUrl("https://jsonplaceholder.typicode.com/todos/2")
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}, 1000);
```

In this example, two fetch requests are made with a delay of 1 second between them. The first request should be automatically canceled when the second request is made, and only the result of the second request should be logged.


Note: To complete this exercise, you will need a Node.js environment with a global fetch function. If your environment does not have a built-in fetch, you can use the 'node-fetch' package or another fetch implementation compatible with Node.js.


## Possible beginning scaffold:

```js
let currentController = null;

async function fetchFromUrl(url) {
  // Check if there is an abort controller and abort if there is

  
  // Create a new AbortController for the new fetch request


    // Do some fetching

    // Reset the currentController after the fetch request is completed

    // 


}
```