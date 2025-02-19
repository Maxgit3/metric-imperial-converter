const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('#get10L', function(done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=10L')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.string, '10 liters converts to 2.64172 gallons');
            done();
          });
    })

    test('#get32g', function(done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=32g')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'invalid unit');
          done();
        });
  })

  test('#get32g', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=3/7.2/4kg')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'invalid number');
        done();
      });
  })

  test('#get3/7.2/4kilomegagram', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'invalid number and unit');
        done();
      });
  })

  test('#getkg', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=kg')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.string, '1 kilograms converts to 2.20462 pounds');
        done();
      });
  })
});
