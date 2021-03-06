require("dotenv").config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');
const db = require('../models');
const qs = require('qs');


chai.use(chaiHttp);
chai.should();

describe('Driver Apis', () => {
  
  /*
  * Test the /POST/v1/api/drivers route
  */
  it('Can post one driver', (done) => {
    var payload=qs.stringify({
      name: 'Muhoracyeye Rebecca',
      email: 'muhoracyer@gmail.com',
      number: 'RAA20A',
      status: 'Available',
      latitude: -1.920231594130813,
      longitude: 30.056408655828637,
      country: "Rwanda",
      city: "Kimironko",
      state: "Kigali",
      streetName: "Intwari",
      streetNumber: "KG 10st Street"
    });
    chai.request(server)
      .post('/v1/api/drivers')
      .type('form')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(payload)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');

        chai.expect(res.body.message).to.eq('Driver Created');
       
        done();
      });
  });

  /*
  * Test the /PATCH/v1/api/drivers/:driverId route
  */
     it('Can update one driver', (done) => {
      var payload=qs.stringify({
        name: 'Ganza Respice',
        email: 'respinho2014@gmail.com',
        number: 'RAB20X',
        status: 'Available',
        latitude: -1.9511374,
        longitude: 30.111793,
        country: "Rwanda",
        city: "Kimironko",
        state: "Kigali",
        streetName: "Intwari",
        streetNumber: "KG 10st Street"
      });
      chai.request(server)
        .patch('/v1/api/drivers/1')
        .type('form')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(payload)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
  
          chai.expect(res.body.message).to.eq('Driver updated');
         
          done();
        });
    });

  /*
  * Test the /GET/v1/api/drivers route
  */
  it('Can get list of drivers', (done) => {
    chai.request(server).get('/v1/api/drivers')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        chai.expect(res.body.message).to.eq('Get a list of all drivers');
        done();
      });
  });
  

  /*
   * Test the /GET/v1/api/drivers/available route
  */
    it('Can get list of available drivers', (done) => {
      chai.request(server).get('/v1/api/drivers/available')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          chai.expect(res.body.message).to.eq('List of available Drivers');
          done();
        });
    });
   /*
  * Test the /GET/v1/api/drivers/:driverId route
  */
  it('Can show one driver', (done) => {
    chai.request(server).get('/v1/api/drivers/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        chai.expect(res.body.message).to.eq('Retrieving a driver');
        done();
      });
  });

  it('Can Get Available Drivers in 3km for specific location', (done) => {
    chai.request(server).get('/v1/api/drivers/specificLocation?lat=-1.947413&lon=30.132987&distanceInKm=2.4')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        chai.expect(res.body.message).to.eq('List of available Drivers within Specific Location');
        done();
      });
  });

  it('Can get a list of the 3 closest drivers For a specific driver', (done) => {
    chai.request(server).get('/v1/api/drivers/closest/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        chai.expect(res.body.message).to.eq('List of closest Drivers');
        done();
      });
  });
  
});