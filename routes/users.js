var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find({}, function(err, users){
		if(err) return next(err);
		
		return res.json(users);
	});
});

router.post('/register', function(req, res, next){
	var newUser = User({
	  username: req.body.username,
	  password: req.body.password,
	  first_name: req.body.first_name,
	  last_name: req.body.last_name,
	  email: req.body.email,
	  contact_no: req.body.contact_no
	});

	// save the user
	newUser.save(function(err) {
	  if (err) return next(err);

	res.json("User created successfully");
	});
});

router.post('/login',  
  passport.authenticate('local', { failureRedirect: false }),
  function(req, res) {
  	res.status(200).send(req.user)
    // res.redirect('/');
});

router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });


module.exports = router;
