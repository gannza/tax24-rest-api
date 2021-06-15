require("dotenv").config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');
const db = require('../models');
const qs = require('qs');


chai.use(chaiHttp);
chai.should();

describe('Rider Apis', () => {

  /*
  * Test the /GET/v1/api/riders/deleteAll route
  */
    it('Can delete all riders', (done) => {
      chai.request(server).delete('/v1/api/riders/deleteAll')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          chai.expect(res.body.message).to.eq('Riders deleted successfully.');
          done();
        });
    });


     /*
  * Test the /POST/v1/api/riders route
  */
  it('Can post one rider', (done) => {
    var payload=qs.stringify({
      name: 'Ganza Respice',
      email: 'respinho2014@gmail.com',
      number: 'RAB20A',
      status: 'Active',
      latitude: -1.8389,
      longitude: 30.09969,
      country: "Rwanda",
      city: "Kayonza",
      state: "Easter province",
      streetName: "Kayonza",
      streetNumber: "KG 404 Street"
    });
    chai.request(server)
      .post('/v1/api/riders')
      .type('form')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(payload)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');

        chai.expect(res.body.message).to.eq('Rider Created');
       
        done();
      });
  });

  /*
  * Test the /PATCH/v1/api/riders/:riderId route
  */
     it('Can update one rider', (done) => {
      var payload=qs.stringify({
        name: 'Ganza J. Respice',
        email: 'respinho2014@gmail.com',
        number: 'RAB20A',
        status: 'Inactive',
        latitude: -1.8389,
        longitude: 30.09969,
        country: "Rwanda",
        city: "Kayonza",
        state: "Easter province",
        streetName: "Kayonza",
        streetNumber: "KG 404 Street"
      });
      chai.request(server)
        .patch('/v1/api/riders/1')
        .type('form')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(payload)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
  
          chai.expect(res.body.message).to.eq('Rider updated');
         
          done();
        });
    });

  /*
  * Test the /GET/v1/api/riders route
  */
  it('Can get list of riders', (done) => {
    chai.request(server).get('/v1/api/riders')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        chai.expect(res.body.message).to.eq('Get a list of all riders');
        done();
      });
  });

   /*
  * Test the /GET/v1/api/riders/:riderId route
  */
  it('Can show one rider', (done) => {
    chai.request(server).get('/v1/api/riders/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        chai.expect(res.body.message).to.eq('Retrieving a rider');
        done();
      });
  });
  
 
});