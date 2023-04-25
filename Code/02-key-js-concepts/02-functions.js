// First-class citizens!
// Haskell ... Clojure ... Scala ... functional!
// Multi-paradigm ... do what you want! OOP, functional, imperative, declarative

// () => {}
function speak(
  message = "Tell me something interesting!",
  alterFunc = (input) => input
) {
  // 2. Functions can be passed as arguments.
  console.log(alterFunc(message));
  // Closure!
  function returnFunction(message) {
    return alterFunc(message);
  }
  return returnFunction; // 3. Return functions from functions.
}

speak();

// async function makeUpperCase(message) {
//   return message.split("").reverse().join("");
// }

const newSpeak = speak; // 1. We can assign functions to variables.

const newFunc = newSpeak("", (message) => message.toUpperCase());

console.log(newFunc("I'm shouting also!"));
// Arrow functions
{
  const saySomething = async () => {
    // Do something interesting!!
    [1, 2, 34];
  };

  console.log(saySomething());
}

{
  const obj = {
    name: "Sophia",
    message: "A bit about JS",
    say: function () {
      console.log(`Hi, I'm ${this.name} and I know ${this.message}`);
    },
  };
  obj.say();
}
