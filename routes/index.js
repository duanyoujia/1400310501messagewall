var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var db_handle = require('../config/db_handle');  /*引入数据模块*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Express' });
});


/*设置进入登陆界面的路由*/
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'login' });
});

/*设置进入注册界面的路由*/
router.get('/register', function(req, res, next) {
    res.render('register', { title: 'register' });
});

/*设置进入注册界面的路由*/
router.post('/register', db_handle.addUser);

router.post('/login',db_handle.signIn);

/*设置进入用户界面的路由*/
router.get('/Users/:id', function(req, res){
    res.render('users', { title: req.params.id });
});

module.exports = router;
