const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.validateSignup = (req, res, next) => {
    req.sanitizeBody('name');
    req.sanitizeBody('email');
    req.sanitizeBody('password');

    //name is not null and 4-10 characters
    req.checkBody('name', 'Enter a Name').notEmpty();
    req.checkBody('name', 'Name  must be between 4 and 10 characters')
        .isLength({min: 4, max: 10});

    //Email is not null, valid ,and normalized
    req.checkBody('email', 'Enter a valid Email')
        .isEmail()
        .normalizeEmail();

    //password not null and 4-10 characters
    req.checkBody('password', 'Enter a Password').notEmpty();
    req.checkBody('password', 'Password  must be between 4 and 10 characters')
        .isLength({min: 4, max: 10});

    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).send({
            'errors': {
                'status_code': 400,
                'message': firstError
            }
        });
    }
    next();
};

exports.signup = async (req, res) => {
    const {name, email, password} = req.body;
    const user = await new User({name, email, password});
    await User.register(user, password, (err, user) => {
        if (err) {
            return res.status(500).send({
                'errors': {
                    'status_code': 500,
                    'message': err.message
                }
            });
        }
         res.json(user);
    })
};

exports.signin = () => {
};

exports.signout = () => {
};

exports.checkAuth = () => {
};
