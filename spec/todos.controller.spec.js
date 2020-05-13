const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../index');
const {
  connectDatabase,
  closeDatabase,
  initCollectionDb,
} = require('./mongodb-memory-handler');

const expect = chai.expect;

process.env.NODE_ENV = 'test';
chai.use(chaiHttp);

var dataTodos = {
  description: 'Sample todo',
  deadline: new Date(),
  done: false,
};
let todoId;

describe('Todos', () => {
  before(async () => {
    await connectDatabase();
    const todos = await initCollectionDb('Todo', [dataTodos]);
    // todoId = todos.insertedIds[0];
  });
  after(async () => {
    await closeDatabase();
  });

  describe('/POST todos', () => {
    it('it should create todo', (done) => {
      chai
        .request(server)
        .post('/todos')
        .send({
          description: 'New todo',
          deadline: new Date(),
          done: false,
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(204);
          done();
        });
    }).timeout(10000);

    it('it should be failed to create todo', (done) => {
      chai
        .request(server)
        .post('/todos')
        .send({})
        .end((err, res) => {
          expect(err).to.be.throw;
          expect(res).to.have.status(500);
          done();
        });
    }).timeout(10000);
  });

  describe('/GET todos', () => {
    it('it should GET all todos', (done) => {
      chai
        .request(server)
        .get('/todos/')
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          todoId = res.body[0]._id;
          done();
        });
    }).timeout(10000);

    it('it should GET todo by id', (done) => {
      chai
        .request(server)
        .get(`/todos/${todoId}`)
        .end((err, { status, body }) => {
          if (err) done(err);
          expect(status).to.equal(200);
          expect(body).to.be.a('object');
          done();
        });
    }).timeout(10000);
  });
});
