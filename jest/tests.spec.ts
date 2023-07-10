import superagent from "superagent";

describe("Test suite GET", () => {

    it("Test 1: chek first_name and last_name in user", async () => {

        const response = await superagent.get('https://reqres.in/api/users').query({ page: 2 }).query({ id: 7 });

        expect(response.status).toBe(200);
        expect(response.body.data.first_name).toEqual("Michael");
        expect(response.body.data.last_name).toEqual("Lawson");
    });


    it("Test 2: chek non-existing user", async () => {

        const response = await superagent.get('https://reqres.in/api/users').query({ id: 77 }).ok(() => true);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
    });

    it("Test 3: chek color and support text in unknown user", async () => {

        const response = await superagent.get('https://reqres.in/api/unknown').query({ id: 2 });

        expect(response.status).toBe(200);
        expect(response.body.data.color).toEqual("#C74375");
        expect(response.body.support.text).toEqual("To keep ReqRes free, contributions towards server costs are appreciated!");
    });
});



describe("Test suite POST", () => {

    it("Test 4: create new user", async () => {
        const response = await superagent
            .post('https://reqres.in/api/users')
            .set('Content-Type', 'application/json')
            .send({
                name: 'Piter',
                job: 'Parker'
            })

        expect(response.status).toEqual(201);
    });

    it("Test 5: login user", async () => {
        const response = await superagent
            .post('https://reqres.in/api/login')
            .set('Content-Type', 'application/json')
            .send({
                email: "eve.holt@reqres.in",
                password: "cityslicka"
            })

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({ token: "QpwL5tke4Pnpja7X4" });

    });

    it("Test 6: error register", async () => {
        const response = await superagent
            .post('https://reqres.in/api/login').ok(() => true)
            .set('Content-Type', 'application/json')
            .send({
                email: "eve.holt@reqres.in"
            })

        expect(response.status).toEqual(400);
        expect(response.body).toEqual({ error: "Missing password" });
    });
});


describe("Test suite DELETE", () => {

    it('Test 7: delete user', async () => {

        const response = await superagent.delete('https://reqres.in/api/users').query({ id: 5 }).ok(() => true);

        expect(response.status).toBe(204);
    })

    it('Test 8: delete all users', async () => {

        const response = await superagent.delete('https://reqres.in/api/users').ok(() => true);

        expect(response.status).toBe(204);
    })

});


describe("Test suite PATCH and PUT", () => {


    it("Test 9: update data user with PATCH", async () => {
        const response = await superagent
            .patch('https://reqres.in/api/users/5')
            .set('Content-Type', 'application/json')
            .send({
                first_name: "Clark",
                last_name: "Cent"
            })

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ first_name: "Clark", last_name: "Cent", updatedAt: expect.any(String)});
    });

    it("Test 10: update data user with PUT", async () => {
        const response = await superagent
            .patch('https://reqres.in/api/users/3')
            .set('Content-Type', 'application/json')
            .send({
                first_name: "Tony",
                last_name: "Cark"
            })

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ first_name: "Tony", last_name: "Cark", updatedAt: expect.any(String)});
    });

});

