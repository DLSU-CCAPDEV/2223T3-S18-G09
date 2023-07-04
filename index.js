/* import modules */
const dotenv = require('dotenv'); // import dotenv module
const express = require('express'); // import express module

const app = express(); // create an instance of express



dotenv.config(); // configure dotenv
port = process.env.PORT; // set the port based on the .env file
hostname = process.env.HOSTNAME; // set the hostname based on the .env file

