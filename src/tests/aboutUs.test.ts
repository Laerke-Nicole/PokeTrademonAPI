import { test, expect } from '@playwright/test';

test.describe("About us crud", () => {
    test("Valid about us info", async ({ request }) => {
    test.setTimeout(30_000);

        // arrange create user and login
        const userRegister = {
            name: "John Doe",
            email: "john@gmail.com",
            password: "123456"
        }

        const userLogin = {
            email: "john@gmail.com",
            password: "123456"
        }

        // register user
        let response = await request.post("/user/register", { data: userRegister });
        let json = await response.json();

        expect(response.status()).toBe(201);


        // login user
        response = await request.post("/user/login", { data: userLogin });
        json = await response.json();

        const token = json.data.token;
        const userId = json.data.userId;
        expect(response.status()).toBe(200);


        // arrange
        const aboutUs = {
            aboutUsTitle: "About Us",
            aboutUsText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            mission: "Our mission is to provide the best trading experience.",
            vision: "Our vision is to be the leading platform for trading Pokémon cards.",
            valuesSubTitle: "Our Values",
            valueOneTitle: "Integrity",
            valueOne: "We value honesty and transparency in all our dealings.",
            valueTwoTitle: "Customer Focus",
            valueTwo: "We prioritize our customers' needs and satisfaction.",
            valueThreeTitle: "Innovation",
            valueThree: "We embrace change and strive for continuous improvement.",
            imageURL: "https://example.com/image.jpg",
            userId: userId
        }

        response = await request.post("/aboutUs/", {
            data: aboutUs,
            headers: {
                "auth-token": token, // add token in the request
            }
        });
        expect(response.status()).toBe(201);


        // verify there is a about us in the db
        response = await request.get("/aboutUs/");
        json = await response.json();
        const receivedAboutUs = json[0];

        // what to expect in the test
        expect(receivedAboutUs.aboutUsTitle).toEqual(receivedAboutUs.aboutUsTitle);
        expect(receivedAboutUs.aboutUsText).toEqual(receivedAboutUs.aboutUsText);
        expect(receivedAboutUs.mission).toEqual(receivedAboutUs.mission);
        expect(receivedAboutUs.vision).toEqual(receivedAboutUs.vision);
        expect(receivedAboutUs.valuesSubTitle).toEqual(receivedAboutUs.valuesSubTitle);
        expect(receivedAboutUs.valueOneTitle).toEqual(receivedAboutUs.valueOneTitle);
        expect(receivedAboutUs.valueOne).toEqual(receivedAboutUs.valueOne);
        expect(receivedAboutUs.valueTwoTitle).toEqual(receivedAboutUs.valueTwoTitle);
        expect(receivedAboutUs.valueTwo).toEqual(receivedAboutUs.valueTwo);
        expect(receivedAboutUs.valueThreeTitle).toEqual(receivedAboutUs.valueThreeTitle);
        expect(receivedAboutUs.valueThree).toEqual(receivedAboutUs.valueThree);
        expect(receivedAboutUs.imageURL).toEqual(receivedAboutUs.imageURL);
        expect(receivedAboutUs.userId).toEqual(receivedAboutUs.userId);

        expect(json).toHaveLength(1);
    });


    // test update about us
    test("Updating about us info", async ({ request }) => {
        test.setTimeout(30_000);
    
        const userRegister = {
            name: "John Doe",
            email: "john@gmail.com",
            password: "123456"
        };
    
        const userLogin = {
            email: "john@gmail.com",
            password: "123456"
        };
    
        // register user
        let response = await request.post("/user/register", { data: userRegister });
        expect(response.status()).toBe(201);
    
        // login user
        response = await request.post("/user/login", { data: userLogin });
        let json = await response.json();
        const token = json.data.token;
        const userId = json.data.userId;
        expect(response.status()).toBe(200);
    
        // create a about us first
        const aboutUs = {
            aboutUsTitle: "About Us",
            aboutUsText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            mission: "Our mission is to provide the best trading experience.",
            vision: "Our vision is to be the leading platform for trading Pokémon cards.",
            valuesSubTitle: "Our Values",
            valueOneTitle: "Integrity",
            valueOne: "We value honesty and transparency in all our dealings.",
            valueTwoTitle: "Customer Focus",
            valueTwo: "We prioritize our customers' needs and satisfaction.",
            valueThreeTitle: "Innovation",
            valueThree: "We embrace change and strive for continuous improvement.",
            imageURL: "https://example.com/image.jpg",
            userId: userId
        }
    
        response = await request.post("/aboutUs/", {
            data: aboutUs,
            headers: {
                "auth-token": token
            }
        });
        expect(response.status()).toBe(201);
        json = await response.json();
        const id = json._id;
    
        // store new data for the about us
        const updatedAboutUs = {
            ...aboutUs,
            aboutUsTitle: "Updated title",
            aboutUsText: "Updated text",
            mission: "Updated mission",
        };
    
        // update the about us data
        response = await request.put(`/aboutUs/${id}`, {
            data: updatedAboutUs,
            headers: {
                "auth-token": token
            }
        });
        expect(response.status()).toBe(200);
    
        // fetch the updated about us
        response = await request.get(`/aboutUs/${id}`);
        json = await response.json();
    
        // assert updated values
        const receivedAboutUs = json[0];
        expect(receivedAboutUs.title).toBe("Updated title");
        expect(receivedAboutUs.subTitle).toBe("Updated subtitle");
        expect(receivedAboutUs.text).toBe("Updated text");
    });


    // test delete about us
    test("Deleting about us", async ({ request }) => {
        test.setTimeout(30_000);
    
        const userRegister = {
            name: "John Doe",
            email: "john@gmail.com",
            password: "123456"
        };
    
        const userLogin = {
            email: "john@gmail.com",
            password: "123456"
        };
    
        // register user
        let response = await request.post("/user/register", { data: userRegister });
        expect(response.status()).toBe(201);
    
        // login user
        response = await request.post("/user/login", { data: userLogin });
        let json = await response.json();
        const token = json.data.token;
        const userId = json.data.userId;
        expect(response.status()).toBe(200);
    
        // create a about us first
        const aboutUs = {
            aboutUsTitle: "About Us",
            aboutUsText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            mission: "Our mission is to provide the best trading experience.",
            vision: "Our vision is to be the leading platform for trading Pokémon cards.",
            valuesSubTitle: "Our Values",
            valueOneTitle: "Integrity",
            valueOne: "We value honesty and transparency in all our dealings.",
            valueTwoTitle: "Customer Focus",
            valueTwo: "We prioritize our customers' needs and satisfaction.",
            valueThreeTitle: "Innovation",
            valueThree: "We embrace change and strive for continuous improvement.",
            imageURL: "https://example.com/image.jpg",
            userId: userId
        }
    
        response = await request.post("/aboutUs/", {
            data: aboutUs,
            headers: {
                "auth-token": token
            }
        });
        expect(response.status()).toBe(201);
        json = await response.json();
        const id = json._id;
    
    
        // delete the about us data
        response = await request.delete(`/aboutUs/${id}`, {
            data: aboutUs,
            headers: {
                "auth-token": token
            }
        });
        expect(response.status()).toBe(200);
    
        // assert updated values
        const deletedAboutUs = json[0];
        expect(deletedAboutUs).toBe(null);
    });
});