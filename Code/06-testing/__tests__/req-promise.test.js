const req = require("../req-promise");

test("handles network errors", async () => {
  await expect(() => req("http://error.com")).rejects.toStrictEqual(
    Error("network error")
  );
});

test("reponds with data", async () => {
  // Arrange/Act
  const data = await req("http://example.com");

  // Assert
  expect(Buffer.isBuffer(data)).toBeTruthy();
  expect(data).toStrictEqual(Buffer.from("some data"));
});
