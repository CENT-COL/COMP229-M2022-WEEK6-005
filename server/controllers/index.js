let express = require('express');
let router = express.Router();

let passport = require('passport');
let jwt = require('jsonwebtoken');
let config = require('../config/db');

let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { title: 'About', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayProductsPage = (req, res, next) => {
    res.render('index', { title: 'Products', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', { title: 'Services', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('index', { title: 'Contact', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayLoginPage = (req, res, next) => {
    if (!req.user) {
        res.render('auth/login', {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    } else {
        return res.redirect('/')
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {

        if (err) {

            return next(err);
        }

        if (!user) {
            req.flash('loginMessage', 'Authentication Error')
        }

        req.login(user, (err) => {

            if (err) {
                req.flash('loginMessage', 'User does not exists')
                return res.redirect('/login')
            }

            const payload = {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            };

            const authToken = jwt.sign(payload, config.Secret, {
                expiresIn: 604800 //1 Week
            });

            return res.redirect('/book-list')
        })
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    if (!req.user) {
        res.render('auth/register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    } else {
        return res.redirect('/')
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });


    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log("Error: Inserting New User");
            if (err.name == "UserExistsError") {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log("Error: User Already Exists!")
            }
            return res.render('auth/register', {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            })
        } else {

            ;
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/book-list');
            });
        }
    })
}

module.exports.performLogout = (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}