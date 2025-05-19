import { test, expect } from '@playwright/test';

test.describe("User Registration", () => {
    test("Valid user registration info", async ({ request }) => {
    test.setTimeout(30_000);

    // arrange
    const user = {
        username: "John Doe",
        email: "mail@gmail.com",
        password: "12345678"
    };

    // act
    const response = await request.post("/auth/register", { data: user });
    const json = await response.json();

    // assert
    expect(response.status()).toBe(201);
    expect(json.error).toEqual(null);
    });

    test("Missing password user registration info", async ({ request }) => {
    test.setTimeout(10_000);

    // arrange
    const user = {
        username: "John Doe",
        email: "mail@gmail.com",
        // password missing
    };

    // act
    const response = await request.post("/auth/register", { data: user });
    const json = await response.json();

    // assert
    expect(response.status()).toBe(400);
    expect(json.error).toEqual("\"password\" length must be at least 6 characters long");
    });
});