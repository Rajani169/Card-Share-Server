export {};
const path = require('path');

// import .env variables
require('dotenv-safe').load({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
  allowEmptyValues: true
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  emailEnabled: !!process.env.EMAIL_MAILGUN_API_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION_MINUTES: process.env.JWT_EXPIRATION_MINUTES,
  EMAIL_TEMPLATE_BASE: './src/templates/emails/',
  EMAIL_FROM_SUPPORT: process.env.EMAIL_FROM_SUPPORT,
  mongo: {
    uri: process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TESTS : process.env.MONGO_URI
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
};
