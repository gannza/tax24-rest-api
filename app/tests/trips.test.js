require("dotenv").config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');
const db = require('../models');
const qs = require('qs');


chai.use(chaiHttp);
chai.should();

describe('Trip Apis', () => {

  /*
  * Test the /GET/v1/api/trips/deleteAll route
  */
    it('Can delete all trips', (done) => {
      chai.request(server).delete('/v1/api/trips/deleteAll')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          chai.expect(res.body.message).to.eq('Trips deleted successfully.');
          done();
        });
    });


     /*
  * Test the /POST/v1/api/trips route
  */
  it('Can post one trip', (done) => {
    var payload=qs.stringify({
      driverId: 1,
      riderId: 1,
      from: 'Kigali',
      to: 'Kayonza',
      status: 'Active',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    chai.request(server)
      .post('/v1/api/trips')
      .type('form')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(payload)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');

        chai.expect(res.body.message).to.eq('Trip Created');
       
        done();
      });
  });

  /*
  * Test the /PATCH/v1/api/trips/:tripId route
  */
     it('Can post one trip', (done) => {
      var payload=qs.stringify({
        driverId: 1,
        riderId: 1,
        from: 'Kayonza',
        to: 'Kigali',
        status: 'Complete',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      chai.request(server)
        .patch('/v1/api/trips/1')
        .type('form')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(payload)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
  
          chai.expect(res.body.message).to.eq('Trip updated');
         
          done();
        });
    });

  /*
  * Test the /GET/v1/api/trips route
  */
  it('Can get list of trips', (done) => {
    chai.request(server).get('/v1/api/trips')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        chai.expect(res.body.message).to.eq('Get a list of all trips');
        done();
      });
  });

   /*
  * Test the /GET/v1/api/trips/:tripId route
  */
  it('Can show one trip', (done) => {
    chai.request(server).get('/v1/api/trips/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        chai.expect(res.body.message).to.eq('Retrieving a trip');
        done();
      });
  });
  
 
});