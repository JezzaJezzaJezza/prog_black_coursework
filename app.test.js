"use strict";

const request = require("supertest");
const app = require("./app");

describe("Test the posts service", () => {
    test("GET /posts succeeds", () => {
        return request(app)
            .get("/posts")
            .expect(200)
    });
    test("GET /posts returns JSON", () => {
        return request(app)
            .get("/posts")
            .expect("Content-type", /json/)
    });
    test("GET /posts includes 1", () => {
        return request(app)
            .get("/posts")
            .expect(/1/)
    });
    test("GET /posts/1 succeeds", () => {
        return request(app)
            .get("/posts/1")
            .expect(200)
    });
    test("GET /comments succeeds", () => {
        return request(app)
            .get("/comments")
            .expect(200)
    });
    test("GET /comments includes key", () => {
        return request(app)
            .get("/comments")
            .expect(/1/)
    });
    test("GET /comments returns JSON", () => {
        return request(app)
            .get("/comments")
            .expect("Content-type", /json/)
    });
    test("POST /new_rev", () => {
        const params = {key:"test_post", desc_rev:"Testing", ratings:"3"}
        return request(app)
            .post("/new_rev")
            .send(params)
                .expect(200)
    });
    test("POST /new_comment", () => {
        const params = {key:"1", comment:"test"}
        return request(app)
            .post("/new_comment")
            .send(params)
                .expect(200)
    });
});