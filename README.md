# TAX24 REST API 
  
  # FEATURES
    1. DRIVERS
      ▪ Get a list of all drivers
      ▪ Get a list of all available drivers
      ▪ Get a list of all available drivers within 3km for a
      specific location
      ▪ Get a specific driver by ID
    2. TRIPS
      ▪ Create a new ‘Trip’ request by assigning a driver to a rider
      ▪ Complete a trip
      ▪ Get a list of all active Trips
      TIP #1: focus on defining a very clear data model for
      drivers, riders and trips. You should include the
      SQL create table statements etc. in your code base.
      TIP #2: invest time in building some ‘seed data’ that
      covers all the use cases you want to demonstrate
    3. RIDERS
      ▪ Get a list of all riders
      ▪ Get a specific rider by ID
      ▪ For a specific driver, get a list of the 3 closest drivers

## Before using

- Please make sure that you have:
 - Node.js installed (https://nodejs.org/)
 - Mysql installed and running locally (latest stable version: 5.1.1)
 - Run `npm install` or `yarn` in your root project folder

## Usage

To run the project, please use a command line the following:
 - `npm start`
    - It will run the server at port 3600.

