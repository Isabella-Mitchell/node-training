"use strict";

let foo = "I'm here";
function outerFunction() {
  let foo = true;
  function print() {
    // let foo = "banana";
    console.log(foo);
  }
  foo = false;
  print();
}
outerFunction();

function init(type) {
  var id = 0;
  return (name) => {
    id += 1;
    return { id: id, type: type, name: name };
  };
}

const userGenerator = init("user");
const adminGenerator = init("admin");

console.log(userGenerator("Judit"));
console.log(adminGenerator("Tanveer"));
console.log(adminGenerator("Catherine"));
