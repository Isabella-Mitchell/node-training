import { getAllBooks } from "../bookControllers.js";
import { jest } from "@jest/globals";
import supertest from "supertest";
import app from "../app.js";

const mockRequest = (query = {}, body) => ({
  query: query,
  body,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn();
  return res;
};

test("that i get all the books on a successful query", async () => {
  const req = mockRequest();
  const res = mockResponse();

  await getAllBooks(req, res);

  expect(res.json).toHaveBeenCalled();
  const returnValue = res.json.mock.calls[0][0];

  expect(returnValue.length).toBe(2);
  expect(returnValue).toContainEqual({
    id: 1,
    author: "John Scalzi",
    title: "Old Man's War",
  });

  expect(returnValue).toContainEqual({
    id: 2,
    author: "Mary Robinette Kowal",
    title: "The Calculating Stars",
  });
});

test("that i filter the books on a correct query", async () => {
  const req = mockRequest({ author: "John" });
  const res = mockResponse();

  await getAllBooks(req, res);

  expect(res.json).toHaveBeenCalled();
  const returnValue = res.json.mock.calls[0][0];

  expect(returnValue.length).toBe(1);
  console.log(returnValue);
  expect(returnValue).toContainEqual({
    id: 1,
    author: "John Scalzi",
    title: "Old Man's War",
  });

  expect(returnValue).not.toContainEqual({
    id: 2,
    author: "Mary Robinette Kowal",
    title: "The Calculating Stars",
  });
});

test("that given the right query parameter, the right object will be returned", async () => {
  const response = await supertest(app).get("/api/v1/books?author=John");
  const data = response.body;

  expect(response.statusCode).toBe(200);
  expect(data.length).toBe(1);
  expect(data).toContainEqual({
    id: 1,
    author: "John Scalzi",
    title: "Old Man's War",
  });

  expect(data).not.toContainEqual({
    id: 2,
    author: "Mary Robinette Kowal",
    title: "The Calculating Stars",
  });
});

test("that given the right query parameter, the right object will be returned", async () => {
  const response = await supertest(app).get("/api/v1/books");
  const data = response.body;

  expect(response.statusCode).toBe(200);

  expect(data.length).toBe(2);
  expect(data).toContainEqual({
    id: 1,
    author: "John Scalzi",
    title: "Old Man's War",
  });

  expect(data).toContainEqual({
    id: 2,
    author: "Mary Robinette Kowal",
    title: "The Calculating Stars",
  });
});
