import { test, expect } from '@playwright/test';

test.describe("User Registration", () => {
    test("Valid user registration info", async ({ request }) => {
        test.setTimeout(30_000);

        // arrange
        const user = {
            username: `John Doe ${Date.now()}`,
            email: `mail+${Date.now()}@gmail.com`,
            password: "12345678",
        };

        // act
        const response = await request.post("/api/auth/register", { data: user });

        const text = await response.text();

        expect(response.status()).toBe(201);

        if (response.headers()['content-type']?.includes('application/json')) {
            const json = JSON.parse(text);
            expect(json).toHaveProperty('message', 'User registered successfully!');
            expect(json).toHaveProperty('userId');

        } else {
            throw new Error('Expected JSON response but got non-JSON');
        }
    });


    test("Valid invalid user registration info (missing password)", async ({ request }) => {
        test.setTimeout(30_000);

        // arrange
        const user = {
            username: `John Doe ${Date.now()}`,
            email: `mail+${Date.now()}@gmail.com`,
            // password: "12345678",
        };

        // act
        const response = await request.post("/api/auth/register", { data: user });

        const text = await response.text();

        // assert
        expect(response.status()).toBe(400);

        if (response.headers()['content-type']?.includes('application/json')) {
            const json = JSON.parse(text);
            expect(json).toHaveProperty('error');
            
            // check error message contains "password"
            expect(json.error.toLowerCase()).toContain('password');
        } else {
            throw new Error('Expected JSON response but got non-JSON');
        }
    });
});