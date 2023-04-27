import { getAllBooks } from "../bookControllers.js";

import supertest from "supertest";
import app from "../app.js";

test("that i get all the books on a successful query", () => {
  // // Mock
  // const req = {};
  // const res = {};
  // jest.spyOn(req);
  // jest.spyOn(res);
  // // sinon
  // const response = getAllBooks(req, res);
  // console.log(response);
  // // Spy
  // expect(true).toBe(true);
});

test("that given the right query parameter, the right object will be returned", async () => {
  const response = await supertest(app).get("/api/v1/books?author=John");
  const data = response.body;

  expect(response.statusCode).toBe(200);
  expect(data.length).toBe(1);
});

test("that given the right query parameter, the right object will be returned", async () => {
  const response = await supertest(app).get("/api/v1/books");
  const data = response.body;

  expect(response.statusCode).toBe(200);
  expect(data.length).toBe(2);
});
