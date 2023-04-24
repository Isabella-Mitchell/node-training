const store = require("./store-async");

test("store returns error when not passed a buffer", (done) => {
  store("something").catch((error) => {
    expect(error.message).toEqual("input must be a buffer");
    done();
  });
});

test("store returns an object with id", async () => {
  const result = await store(Buffer.from("some data"));
  expect(result.id).toBeTruthy();
  expect(result.id.length).toEqual(4);
});
