// Promises!
const { readFile } = require("fs/promises");
readFile(__filename).then((contents) => console.log(contents));
// ELI5

// Bake a cake don't have an ingredient   - I promise to make you cake (pending)
//   - if they return ingredients (cake)     - resolve to make your cake
//   - if they were all out of ingredients (no cake)   - reject the cake - an alternate route

// Pending -> unsettled
// Resolve -> settled
// Reject  -> settled

const bakeMeACakePromise = new Promise((resolve, reject) => {
  const theyHadTheIngredients = true;
  setTimeout(() => {
    if (theyHadTheIngredients) {
      resolve("Vanilla sponge");
    } else {
      reject("😭");
    }
  }, 100);
});

// bakeMeACakePromise
//   .then((cake) => {
//     console.log(`I'm looking forward to my ${cake} cake.`);
//   })
//   .catch((error) => console.log(`Sorry, no cake - my expression: ${error}`));
fetch("https://api.github.com/users/doingandlearning")
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .then((data) => fetch(data.followers_url))
  .then((response) => response.json())
  .then((data) => Promise.allSettled(data.map((people) => fetch(people.url))))
  .then((responses) =>
    Promise.all(responses.map((response) => response.json()))
  )
  .then((data) => console.log(data));
