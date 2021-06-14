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
  * Test the /GET/v1/api/drivers/deleteAll route
  */
    it('Can delete all drivers', (done) => {
      chai.request(server).delete('/v1/api/drivers/deleteAll')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          chai.expect(res.body.message).to.eq('Drivers deleted successfully.');
          done();
        });
    });


     /*
  * Test the /POST/v1/api/drivers route
  */
  it('Can post one driver', (done) => {
    var payload=qs.stringify({
      name: 'Muhoracyeye Rebecca',
      email: 'muhoracyer@gmail.com',
      number: 'RAA20A',
      status: 'Inactive',
      latitude: -1.8389,
      longitude: 30.09969,
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
  * Test the /POST/v1/api/drivers route
  */
     it('Can post one driver', (done) => {
      var payload=qs.stringify({
        name: 'Muhoracyeye Mbandure Rebecca',
        email: 'muhoracyer@gmail.com',
        number: 'RAA20A',
        status: 'Inactive',
        latitude: -1.8389,
        longitude: 30.09969,
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
  
  // it('Everyone Can Get Available Drivers', (done) => {
  //   chai.request(app).get('/drivers/available')
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.body.should.be.an('object');
  //       chai.expect(res.body.message).to.eq('List of available Drivers');
  //       done();
  //     });
  // });
  // it('Everyone Can Get One Specific Driver', (done) => {
  //   chai.request(app).get('/drivers/5')
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.body.should.be.an('object');
  //       chai.expect(res.body.message).to.eq('Driver Information');
  //       done();
  //     });
  // });
  // it('Driver Can Get Available Driver in 3km for specific location', (done) => {
  //   chai.request(app).get('/drivers/closeto/2')
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.body.should.be.an('object');
  //       chai.expect(res.body.message).to.eq('List of available Drivers');
  //       done();
  //     });
  // });
});