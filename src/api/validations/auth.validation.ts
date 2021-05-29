export {};
const Joi = require('joi');

module.exports = {
  // POST /v1/auth/register
  register: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .min(6)
        .max(128),
      name: Joi.string().max(128),
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
    }
  },

  // POST /v1/auth/login
  login: {
    body: {
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
      email: Joi.string().email(),
      password: Joi.string()
        .required()
        .max(128)
    }
  },

  // POST /v1/auth/facebook
  // POST /v1/auth/google
  oAuth: {
    body: {
      access_token: Joi.string().required()
    }
  },

  // POST /v1/auth/refresh
  refresh: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      refreshToken: Joi.string().required()
    }
  },

  // POST /v1/auth/forgot-password
  forgotPassword: {
    body: {
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
      email: Joi.string().email()
    }
  },

  // POST /v1/auth/reset-password
  resetPassword: {
    body: {
      id: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
      oldPassword: Joi.string(),
      password: Joi.string()
    }
  }
};
