exports.validateSignup = (req, res, next) => {
    req.sanitizeBody('name');
    req.sanitizeBody('email');
    req.sanitizeBody('password');

    //name is not null and 4-10 characters
    req.checkBody('name', 'Enter a Name').notEmpty();
    req.checkBody('name', 'Name  must be between 4 and 10 characters')
        .isLength({min: 4, max: 10});

    //Email is not null, valid ,and normalized
    req.checkBody('email','Enter a valid Email')
        .isEmail()
        .normalizeEmail();

    //password not null and 4-10 characters
    req.checkBody('password', 'Enter a Password').notEmpty();
    req.checkBody('password', 'Password  must be between 4 and 10 characters')
        .isLength({min: 4, max: 10});

    const errors = req.validationErrors();
    if(errors){
       const firstError = errors.map(error => error.msg)[0];
       return res.status().send(firstError);
    }
};

exports.signup = () => {
};

exports.signin = () => {
};

exports.signout = () => {
};

exports.checkAuth = () => {
};
