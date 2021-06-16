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
  * Test the /POST/v1/api/trips route
  */
  it('Can post one trip', (done) => {
    var payload=qs.stringify({
      driverId: 2,
      riderId: 2,
      from: 'Kigali',
      to: 'Kayonza',
      status: 'Active'
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
     it('Can update one trip', (done) => {
      var payload=qs.stringify({
        from: 'Kayonza',
        to: 'Kigali',
        status: 'Active'
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
  * Test the /GET/v1/api/trips/active route
  */
  it('Can get list of active trips', (done) => {
    chai.request(server).get('/v1/api/trips/active')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        chai.expect(res.body.message).to.eq('List of all active Trips');
        done();
      });
  });


   /*
  * Test the /PATCH/v1/api/trips/:tripId route
  */
   it('Can complete a trip', (done) => {
    var payload=qs.stringify({
      status: 'Complete'
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