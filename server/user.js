
const express = require('express');
const utils = require('utility');

const Router = express.Router();
const model = require('./model');

const User = model.getModel('user');

Router.get('/list', (req, res) => (
  User.find({}, (err, doc) => (
    res.json(doc)
  ))
));
// 密码加盐
const md5Pwd = pwd => utils.md5(utils.md5(`${pwd}63235#%^%&^*&fkorsmkfmsf@!#@#$34234`));
// 用户登录
Router.post('/login', (req, res) => {
  const { user, pwd } = req.body;
  User.findOne({ user, pwd: md5Pwd(pwd) }, { pwd: 0, __v: 0 }, (err, data) => {
    if (!data) {
      return res.json({ code: 1, msg: '用户名或密码不正确' });
    }
    return res.json({ code: 0, data });
  });
});
// 用户注册
Router.post('/register', (req, res) => {
  const { user, pwd, type } = req.body;
  User.findOne({ user }, (err, doc) => {
    if (doc) {
      return res.json({ code: 1, msg: '用户名重复' });
    }
    return User.create({ user, pwd: md5Pwd(pwd), type }, (e, data) => {
      if (e) {
        return res.json({ code: 1, msg: '后台出错了' });
      }
      /* eslint-disable */
      /* eslint-enable */
      return res.json({ code: 0, data });
    });
  });
});

// 清除所有数据
// User.remove({}, () => {});
// 查询用户 cookie
Router.get('/info', (req, res) => res.json({ code: 1 }));

module.exports = Router;
