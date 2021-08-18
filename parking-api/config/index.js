require('dotenv').config();
const path = require('path');
const fs = require('fs');

const homePath = ''

const config = {
  dev: process.env.NODE_ENV !== 'production',
  httpPort: process.env.PORT || 8000,
  httpsPort: 8080,
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET','POST','PUT','DELETE'],
    optionsSuccessStatus: 204,
    credentials: true,
  },
  ssl: {
    key: fs.readFileSync(path.resolve(__dirname,'../cert/key.pem')),
    cert:fs.readFileSync(path.resolve(__dirname,'../cert/cert.pem'))
  }
};

module.exports = { config };