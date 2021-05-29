import * as Joi from 'joi';
import { User } from '../../api/models';

export {};

const userObj = {
  name: Joi.string().max(128),
  email: Joi.string().email(),
  role: Joi.string().valid(User.roles),
  username: Joi.string()
    .min(3)
    .max(30),
  contact: Joi.string()
    .min(10)
    .max(10),
  variant: Joi.string(),
  alternateContact: Joi.string()
    .min(10)
    .max(10),
  addressOffice: Joi.string(),
  addressHome: Joi.string(),
  company: Joi.string(),
  designation: Joi.string(),
  website: Joi.string(),
  incomingConnections: Joi.array().items(Joi.string().regex(/^[a-fA-F0-9]{24}$/)),
  outgoingConnections: Joi.array().items(Joi.string().regex(/^[a-fA-F0-9]{24}$/))
};

module.exports = {
  // GET /v1/users
  listUsers: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100),
      ...userObj
    }
  },

  // POST /v1/users
  createUser: {
    body: {
      password: Joi.string()
        .min(6)
        .max(128)
        .required(),
      ...userObj
    }
  },

  // PUT /v1/users/:userId
  replaceUser: {
    body: {
      password: Joi.string()
        .min(6)
        .max(128)
        .required(),
      ...userObj
    },
    params: {
      userId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  },

  // PATCH /v1/users/:userId
  updateUser: {
    body: {
      password: Joi.string()
        .min(6)
        .max(128),
      ...userObj
    },
    params: {
      userId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  }
};
