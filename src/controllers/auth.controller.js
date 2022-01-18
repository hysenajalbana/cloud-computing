const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { 
  IAMClient, 
  AddClientIDToOpenIDConnectProviderCommand, 
  CreateUserCommand, 
  AddUserToGroupCommand,
  CreateGroupCommand,
  AttachGroupPolicyCommand,
  AttachUserPolicyCommand,
  CreateRoleCommand,
  CreatePolicyCommand,
  CreateLoginProfileCommand
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

const attachUserPolicy = catchAsync(async (req, res) => {
  const { username, policyArn } = req.body;

  const params = {
    /** input parameters */
    UserName: username,
    PolicyArn: policyArn
  };
  const command = new AttachUserPolicyCommand(params);

    const data = await client.send(command);

    res.send({ data});
});

const createRole = catchAsync(async (req, res) => {
  const { assumeRolePolicyDocument, path, roleName } = req.body;

  const params = {
    /** input parameters */
    AssumeRolePolicyDocument: assumeRolePolicyDocument,
    Path: path,
    RoleName: roleName
  };
  const command = new CreateRoleCommand(params);

    const data = await client.send(command);

    res.send({ data});
});

const createPolicy = catchAsync(async (req, res) => {

  const { policyDocument, policyName, tags } = req.body;

  const params = {
    /** input parameters */
    PolicyDocument: policyDocument,
    PolicyName: policyName,
    Tags: tags
  };

  const command = new CreatePolicyCommand(params);

    const data = await client.send(command);

    res.send({ data});
});


const createLoginProfile = catchAsync(async (req, res) => {

  const { password, passwordRestRequired, username } = req.body;

  var params = {
    Password: password, 
    PasswordResetRequired: passwordRestRequired, 
    UserName: username
   };

  const command = new CreateLoginProfileCommand(params);

    const data = await client.send(command);

    res.send({ data});
});

module.exports = {
  register,
  addUserToGroup,
  createGroup,
  attachGroupPolicy,
  attachUserPolicy,
  createRole,
  createPolicy,
  createLoginProfile
};
