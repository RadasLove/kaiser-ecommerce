exports.userSignupValidator = (req, res, next) => {
  req.check('name', 'Jméno je povinné').notEmpty();

  req
    .check('email', 'Email musí mít 3 až 32 znaků')
    .matches(/.+\@.+\..+/)
    .withMessage('Email musí mit @')
    .isLength({
      min: 4,
      max: 32
    });

  req.check('password', 'Heslo je povinné').notEmpty();
  req
    .check('password')
    .isLength({ min: 6 })
    .withMessage('Heslo musí mít aspon 6 znaků')
    .matches(/\d/)
    .withMessage('Heslo musí mít číslo');

  const errors = req.validationErrors();

  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }

  next();
};
