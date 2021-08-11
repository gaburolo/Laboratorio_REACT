require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 8080,
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET','POST','PUT','DELETE'],
    optionsSuccessStatus: 204,
    credentials: true,
  }
};

module.exports = { config };