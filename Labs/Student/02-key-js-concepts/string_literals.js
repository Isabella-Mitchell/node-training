const assert = require("assert");

const person = {
  name: "Kevin Cunningham",
  friends: ["Simon", "Colby", "Lauro", "Joel"],
};
// construct a string using template literal string interpolation
const personsFriends = `${person.name} has ${
  person.friends.length
} friends: ${person.friends.join(", ")}.`;

console.log(personsFriends);

assert.equal(
  personsFriends,
  "Kevin Cunningham has 4 friends: Simon, Colby, Lauro, Joel."
);
