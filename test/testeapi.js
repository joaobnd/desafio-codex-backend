const chai = require("chai");
const server = require("../app");
const chaiHttp = require("chai-http");
const User = require('../models/user');
const MongoInMemory = require('mongodb-memory-server');
//const databaseConfig = require('../src/config/config');

function Database(databaseConfig) {
    return databaseConfig
}
//Assertion Style
const should = chai.should();

const HTTP_CODE_OK = 200;
const HTTP_CODE_NOT_FOUND = 404;

chai.use(chaiHttp);

describe('Auth module', async function () {
    before(async function () {
        mongoServer = new MongoInMemory.MongoMemoryServer();
        Database(await mongoServer.getUri())
    });


    it('Login com email não cadastrado', function (done) {
        const incorrect_email = "email@mail.com";
            chai.request(server)
                .post('/users')
                .send({ "email": incorrect_email, "password": "senha" })
                .end((err, response) => {
                    response.should.have.status(HTTP_CODE_NOT_FOUND);
                done();
                });
        });

        /**
         * Método POST
         */
        describe("POST cadastra novo user", () => {
            it("It should POST a new user", (done) => {
                const user = {
                    email: "test523@testes.com",
                    password: "senha123"
                };
                chai.request(server)
                    .post("/users/create")
                    .send(user)
                    .end((err, response) => {
                        response.body.should.be.a('object');
                        response.body.should.have.property('user');
                        response.body.should.have.property('token');
                    done();
                    });
            })
        })
    

        it('Login com credenciais corretas', function (done) {
            const correct_email = "teste@testes.com";
                chai.request(server)
                    .post('/users/auth')
                    .send({ "email": correct_email, "password": "senha123" })
                    .end(function (err, response) {
                        response.should.have.status(200);
                        response.body.should.have.property('user');
                        response.body.should.have.property('token');
                        response.body.user.should.have.not.property('password');
                    done();
                    });
            });

        /**
         * Método GET
         */
        describe("GET user", () => {
            it("It should GET all the users", (done) => {
                chai.request(server)
                    .get("/users/")
                    .end((err, response) => {
                        response.should.have.a('object');
                    done();
                    })
            })
        })
});

