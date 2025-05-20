// import { test, expect } from '@playwright/test';

// test.describe("News crud", () => {
//     test("Valid news info", async ({ request }) => {
//     test.setTimeout(30_000);

//         // arrange create user and login
//         const userRegister = {
//             name: "John Doe",
//             email: "john@gmail.com",
//             password: "123456"
//         }

//         const userLogin = {
//             email: "john@gmail.com",
//             password: "123456"
//         }

//         // register user
//         let response = await request.post("/user/register", { data: userRegister });
//         let json = await response.json();

//         expect(response.status()).toBe(201);


//         // login user
//         response = await request.post("/user/login", { data: userLogin });
//         json = await response.json();

//         const token = json.data.token;
//         const userId = json.data.userId;
//         expect(response.status()).toBe(200);


//         // arrange
//         const news = {
//             title: "Upcoming event",
//             subTitle: "New event coming soon",
//             text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             imageURL: "https://example.com/image.jpg",
//             date: "2023-10-01",
//             theme: "Event",
//             isHidden: false,
//             userId: userId
//         }

//         response = await request.post("/news/", {
//             data: news,
//             headers: {
//                 "auth-token": token, // add token in the request
//             }
//         });
//         expect(response.status()).toBe(201);


//         // verify there is a news in the db
//         response = await request.get("/news/");
//         json = await response.json();
//         const receivedNews = json[0];

//         // what to expect in the test
//         expect(receivedNews.title).toEqual(receivedNews.title);
//         expect(receivedNews.subTitle).toEqual(receivedNews.subTitle);
//         expect(receivedNews.text).toEqual(receivedNews.text);
//         expect(receivedNews.imageURL).toEqual(receivedNews.imageURL);
//         expect(receivedNews.date).toEqual(receivedNews.date);
//         expect(receivedNews.theme).toEqual(receivedNews.theme);
//         expect(receivedNews.isHidden).toEqual(receivedNews.isHidden);
//         expect(receivedNews.userId).toEqual(receivedNews.userId);

//         expect(json).toHaveLength(1);
//     });


//     // test update news
//     test("Updating news info", async ({ request }) => {
//         test.setTimeout(30_000);
    
//         const userRegister = {
//             name: "John Doe",
//             email: "john@gmail.com",
//             password: "123456"
//         };
    
//         const userLogin = {
//             email: "john@gmail.com",
//             password: "123456"
//         };
    
//         // register user
//         let response = await request.post("/user/register", { data: userRegister });
//         expect(response.status()).toBe(201);
    
//         // login user
//         response = await request.post("/user/login", { data: userLogin });
//         let json = await response.json();
//         const token = json.data.token;
//         const userId = json.data.userId;
//         expect(response.status()).toBe(200);
    
//         // create a news first
//         const news = {
//             title: "Upcoming event",
//             subTitle: "New event coming soon",
//             text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             imageURL: "https://example.com/image.jpg",
//             date: "2023-10-01",
//             theme: "Event",
//             isHidden: false,
//             userId: userId
//         }
    
//         response = await request.post("/news/", {
//             data: news,
//             headers: {
//                 "auth-token": token
//             }
//         });
//         expect(response.status()).toBe(201);
//         json = await response.json();
//         const id = json._id;
    
//         // store new data for the news
//         const updatedNews = {
//             ...news,
//             title: "Updated title",
//             subTitle: "Updated subtitle",
//             text: "Updated text",
//         };
    
//         // update the news data
//         response = await request.put(`/news/${id}`, {
//             data: updatedNews,
//             headers: {
//                 "auth-token": token
//             }
//         });
//         expect(response.status()).toBe(200);
    
//         // fetch the updated news
//         response = await request.get(`/news/${id}`);
//         json = await response.json();
    
//         // assert updated values
//         const receivedNews = json[0];
//         expect(receivedNews.title).toBe("Updated title");
//         expect(receivedNews.subTitle).toBe("Updated subtitle");
//         expect(receivedNews.text).toBe("Updated text");
//     });


//     // test delete news
//     test("Deleting news", async ({ request }) => {
//         test.setTimeout(30_000);
    
//         const userRegister = {
//             name: "John Doe",
//             email: "john@gmail.com",
//             password: "123456"
//         };
    
//         const userLogin = {
//             email: "john@gmail.com",
//             password: "123456"
//         };
    
//         // register user
//         let response = await request.post("/user/register", { data: userRegister });
//         expect(response.status()).toBe(201);
    
//         // login user
//         response = await request.post("/user/login", { data: userLogin });
//         let json = await response.json();
//         const token = json.data.token;
//         const userId = json.data.userId;
//         expect(response.status()).toBe(200);
    
//         // create a news first
//         const news = {
//             title: "Upcoming event",
//             subTitle: "New event coming soon",
//             text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             imageURL: "https://example.com/image.jpg",
//             date: "2023-10-01",
//             theme: "Event",
//             isHidden: false,
//             userId: userId
//         }
    
//         response = await request.post("/news/", {
//             data: news,
//             headers: {
//                 "auth-token": token
//             }
//         });
//         expect(response.status()).toBe(201);
//         json = await response.json();
//         const id = json._id;
    
    
//         // delete the news data
//         response = await request.delete(`/news/${id}`, {
//             data: news,
//             headers: {
//                 "auth-token": token
//             }
//         });
//         expect(response.status()).toBe(200);
    
//         // assert updated values
//         const deletedNews = json[0];
//         expect(deletedNews).toBe(null);
//     });
// });