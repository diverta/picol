const fs = require('fs');
const path = require('path');

const waitMilliSecond = 0;

const tasks = [
  'top',
  'username',
  'inputUsername',
  'password',
  'inputPassword',
  'submitLogin',
  'clickPost',
  'clickActivity',
  'clickMyPage',
  'clickLikedPost',
  'clickMyPage',
  'clickCommentedPost',
  'clickMyPage',
  'clickEditProfile',
].map((promiseFactoryName) => ({
  promiseFactoryName,
  promiseFactory: require(path.resolve(__dirname, promiseFactoryName)),
  waitMilliSecond,
}));

module.exports = tasks;
