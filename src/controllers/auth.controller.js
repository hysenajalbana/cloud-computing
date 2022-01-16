const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { 
  IAMClient, 
  AddClientIDToOpenIDConnectProviderCommand, 
  CreateUserCommand, 
  AddUserToGroupCommand,
  CreateGroupCommand,
  AttachGroupPolicyCommand
} = require("@aws-sdk/client-iam");
const { authService, userService, tokenService, emailService } = require('../services');

const client = new IAMClient({ region: "eu-central-1" });

const register = catchAsync(async (req, res) => {
  
  const params = {
    /** input parameters */
    UserName: req.body.username
  };
  const command = new CreateUserCommand(params);

    const data = await client.send(command);
    const user = data.User;
    res.status(httpStatus.CREATED).send({ user });

});

const createGroup = catchAsync(async (req, res) => {
  
  const params = {
    /** input parameters */
    GroupName: req.body.groupName
  };
  const command = new CreateGroupCommand(params);

    const data = await client.send(command);
    res.status(httpStatus.CREATED).send({ data });

});

const addUserToGroup = catchAsync(async (req, res) => {
  const { groupName, userName } = req.body;

  const params = {
    /** input parameters */
    GroupName: groupName,
    UserName: userName
  };
  const command = new AddUserToGroupCommand(params);

    const data = await client.send(command);

    res.send({ data});
});

const attachGroupPolicy = catchAsync(async (req, res) => {
  const { groupName, policyArn } = req.body;

  const params = {
    /** input parameters */
    GroupName: groupName,
    PolicyArn: policyArn
  };
  const command = new AttachGroupPolicyCommand(params);

    const data = await client.send(command);

    res.send({ data});
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  addUserToGroup,
  createGroup,
  attachGroupPolicy,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
