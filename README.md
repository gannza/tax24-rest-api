# Author
 [Ganza Respice](https://github.com/gannza?tab=repositories)
# TAX24 REST API 
[![Build Status](https://www.travis-ci.com/gannza/tax24-rest-api.svg?branch=master)](https://www.travis-ci.com/gannza/tax24-rest-api)

## FEATURES
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
 - Visual studio code(https://code.visualstudio.com/download) for editing and running the app
 - Postman(https://www.getpostman.com/downloads/) to test the Api endpoints
 - Node.js installed (https://nodejs.org/)
 - Make sure Mysql installed and running locally (latest stable version: 5.1.1)
    * For Window: you can download xampp app(https://www.apachefriends.org/xampp-files/8.0.7/xampp-windows-x64-8.0.7-0-VS16-installer.exe)  install it in your computer then after installation is completed, you can start mysql.
    * For lunix: Install Mysql by following this link (https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04)

## Installation

  #### A. Clone the project
  1. From your computer, open terminal 
  2. Run `git clone https://github.com/gannza/tax24-rest-api.git` to clone the repository.
  3. go to your project folder `cd tax24-rest-ap`
  4. Run `npm install` using terminal to install all dependencies.
  5. Create your database.
      * For window: after xampp is already started, please follow this link (http://localhost/phpmyadmin/server_databases.php?server=1)
      * For Linux: STEP1: RUN   `mysql -u root -p`, STEP 2: RUN `CREATE DATABASE tax24;`
  6. Make a Copy of `.env.example` the  name it `.env` in root directory
  7. In `.env` please replace environment variables with your value

  ## Usage

  To run the project, please use a command line the following:
  1. RUN `npm run db:migrate` to create your database tables.
      * You can run `npm run db:rollback` to undo all tables then run again `npm run db:migrate` to    re-migrate.
  2. RUN `npm run db:seed` to insert seeds in tables.
  3. RUN `npm run test` to test all endpoint .
  4. RUN `npm run start` to start application . 
      - It will run the server at port configured in .env `APP_PORT=3600` file.

## API endpoints
   Click this link to view api documentation https://documenter.getpostman.com/view/4883600/TzeWF7P5
   Open this link https://www.getpostman.com/collections/a0c6633e2ccec13deaa9 to access POSTMAN APIs

