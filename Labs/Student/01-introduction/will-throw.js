function f(n = 99) {
  if (n === 0) throw Error();
  f(n - 1);
}
f();
// node --stack-trace-limit=120 Labs/Student/01-introduction/will-throw.js
