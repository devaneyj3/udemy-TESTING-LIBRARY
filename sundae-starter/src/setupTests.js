import "@testing-library/jest-dom";
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./mocks/server";

// Establish API mocking before all the tests
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they affect other tests
afterEach(() => server.resetHandlers());

// Clean up afer the tests are finished
afterAll(() => server.close());
