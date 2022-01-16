const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    username: Joi.string().required(),
  }),
};

const createGroup = {
  body: Joi.object().keys({
    groupName: Joi.string().required(),
  }),
};

const addUserToGroup = {
  body: Joi.object().keys({
    groupName: Joi.string().required(),
    usernName: Joi.string().required(),
  }),
};

const attachGroupPolicy = {
  body: Joi.object().keys({
    groupName: Joi.string().required(),
    policyArn: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  addUserToGroup,
  createGroup,
  attachGroupPolicy,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
