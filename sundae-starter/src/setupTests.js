// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { handlers } from "./mocks/handlers";

// src/setupTests.js
import { server } from "./mocks/server";
// Establish API mocking before all tests.
beforeAll(() => server.listen());

afterEach(() => {
	server.resetHandlers(); // removes any overrides
	server.use(...handlers); // reapply default handlers
});

// Clean up after the tests are finished.
afterAll(() => server.close());
