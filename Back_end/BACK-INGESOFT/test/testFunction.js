let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../Server/src/index");

chai.should();

chai.use(chaiHttp);

describe('Tasl Api', () =>{
    /***
     *------------------------------ Test the GET route
     */
    describe("GET /api/tasks", () =>{
        it("It should GER all the tasks", (done) => {
            chai.request(server)
                .get("/api/tasks")
                .end((err, response) =>{
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(3);
                    done();
                })
        })
        it("It should NOT GER other", (done) => {
            chai.request(server)
                .get("/api/tasks")
                .end((err, response) =>{
                    response.should.have.status(404);
                    done();
                })
        })
    });
    /***
     *---------------------------- Test the GET (by id) route
     */
    describe("GET /api/tasks/:id", () =>{
        it("It should GER a task by ID", (done) => {
            const taskId = 1;
            chai.request(server)
                .get("/api/tasks/"+taskId)
                .end((err, response) =>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id');
                    response.body.should.have.property('name');
                    response.body.should.have.property('completed');
                    response.body.should.have.property('id').eq(1);
                    done();
                })
        })
        it("It should GER a task by ID", (done) => {
            const taskId = 123;
            chai.request(server)
                .get("/api/tasks/"+taskId)
                .end((err, response) =>{
                    response.should.have.status(200);
                    response.text.should.be.eq("The tasl with provided ID does not exist.");
                    done();
                })
        })
    });

    /***
     *---------------------------- Test the POST route
     */
    describe("POST /api/tasks", () =>{
        it("It should POST a new task", (done) => {
            const task = {
                name: "Task 4",
                completed: false
            }
            chai.request(server)
                .post("/api/tasks")
                .sent(task)
                .end((err, response) =>{
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq(4);
                    response.body.should.have.property('name').eq("Task 4");
                    response.body.should.have.property('completed').eq(false);
                    done();
                })
        });
        it("It should Not POST a new task withoud the name property", (done) => {
            const task = {
                name: "Task 4",
                completed: false
            }
            chai.request(server)
                .post("/api/tasks")
                .sent(task)
                .end((err, response) =>{
                    response.should.have.status(400);
                    response.text.should.be.eq("The tasl with provided ID does not exist.");
                    done();
                })
        });
    });
});