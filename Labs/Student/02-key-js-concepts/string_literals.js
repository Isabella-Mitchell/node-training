const assert = require("assert");

const person = {
  name: "Kevin Cunningham",
  friends: ["Simon", "Colby", "Lauro", "Joel"],
};
// construct a string using template literal string interpolation
const personsFriends = `${person.name} has 4 friends: ${person.friends[0]}, ${person.friends[1]}, ${person.friends[2]}, ${person.friends[3]}.`;

console.log(personsFriends);

assert.equal(
  personsFriends,
  "Kevin Cunningham has 4 friends: Simon, Colby, Lauro, Joel."
);
