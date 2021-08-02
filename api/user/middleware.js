const { check, validationResult } = require("express-validator");
const Users = require("./model");

const validateNewUser = async (req, res, next) => {
  //-------------------firstname------------------------------//
  await check("firstname")
    .notEmpty()
    .withMessage("%Firstname is required%")
    .run(req);

  await check("firstname")
    .isLength({ min: 3 })
    .withMessage("%Firstname must have minimum length of 3%")
    .run(req);

  await check("firstname")
    .isAlpha()
    .withMessage("%Firstname not contains number%")
    .run(req);

  //-------------------lastname------------------------------//
  await check("lastname")
    .notEmpty()
    .withMessage("%Lastname is required%")
    .run(req);

  await check("lastname")
    .isLength({ min: 3 })
    .withMessage("%Lastname must have minimum length of 3%")
    .run(req);

  await check("lastname")
    .isAlpha()
    .withMessage("%Lastname not contains number%")
    .run(req);

  // -------------------age------------------------------//
  await check("age").notEmpty().withMessage("%Age is required%").run(req);

  await check("age").isNumeric().withMessage("%Invalid format age%").run(req);

  await check("age")
    .isNumeric()
    .isLength({ max: 2 })
    .withMessage("%Virsta nu mai mult de 2 numere%")
    .run(req);

  // //-------------------email------------------------------//

  await check("email").notEmpty().withMessage("%Email is requierd%").run(req);

  await check("email")
    .isEmail()
    .withMessage("%The specified email does not match the rules%")
    .run(req);

  await check("email")
    .custom((email) => {
      return Users.find({
        email,
      }).then((users) => {
        if (users.length > 0) {
          return res.status(400).json("%Email is already registered%");
        }
      });
    })
    .run(req);

  //-------------------username------------------------------//
  await check("username")
    .notEmpty()
    .withMessage("%Username is required%")
    .run(req);

  await check("username")
    .isLength({ min: 4, max: 10 })
    .withMessage("%Username should have min and max length between 4-10%")
    .run(req);

  await check("username")
    .custom((username) => {
      return Users.find({
        username,
      }).then((users) => {
        if (users.length > 0) {
          return res.status(400).json("%Username is already in use%");
        }
      });
    })
    .run(req);

  //-------------------password------------------------------//

  await check("password")
    .notEmpty()
    .withMessage("%Password is required%")
    .run(req);

  await check("password")
    .isLength({ min: 8, max: 15 })
    .withMessage("%Your password should have min and max length between 8-15%")
    .run(req);

  await check("password")
    .matches(/\d/)
    .withMessage("%Your password should have at least one number%")
    .run(req);

  await check("password")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("%Your password should have at least one special character%")
    .run(req);

  //-------------------mobile------------------------------//
  await check("mobile")
    .notEmpty()
    .withMessage("%Mobile phone number is required%")
    .run(req);

  await check("mobile")
    .isMobilePhone()
    .withMessage("%Mobile invalid%")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map((error) => {
      return error.msg;
    });

    return res.status(400).json(errorMessage);
  } else {
    next();
  }
};

const validateUserOnChange = async (req, res, next) => {
  await check("firstname")
    .notEmpty()
    .withMessage("Firstname is required.")
    .isLength({ min: 3 })
    .withMessage("Firstname must have minimum length of 3.")
    .run(req);

  await check("lastname")
    .notEmpty()
    .withMessage("Lastname is required.")
    .isLength({ min: 3 })
    .withMessage("Lastname must have minimum length of 3.")
    .run(req);

  await check("age")
    .notEmpty()
    .withMessage("Age is required.")
    .isNumeric()
    .withMessage("Invalid format.")
    .run(req);

  await check("mobile")
    .notEmpty()
    .withMessage("Mobile phone number is required.")
    .isMobilePhone()
    .withMessage("Mobile phone number is wrong.")
    .run(req);

  await check("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 4, max: 10 })
    .withMessage("Username should have min and max length between 4-10")
    .run(req);

  await Users.find({
    username: req.body.username,
  })
    .then((users) => {
      if (users.length > 0 && req.body.username !== req.decoded.username) {
        return res.status(400).json("Username is already in use.");
      }
    })
    .catch(next);

  await check("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .normalizeEmail()
    .withMessage("The specified email does not match the rules.")
    .run(req);

  await Users.find({
    email: req.body.email,
  })
    .exec()
    .then((users) => {
      if (users.length > 0 && req.body.email !== req.decoded.email) {
        return res.status(400).json("Email is already registered.");
      }
    })
    .catch(next);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  } else {
    next();
  }
};

//--------------------------------------------------------------------------------------------------//

const checkUserExists = async (req, res, next) => {
  Users.findOne({ _id: req.params.user_id, status: "Active" })
    .then((user) => {
      if (!user) {
        return res.status(400).json(" User is not found.");
      } else {
        next();
      }
    })
    .catch(next);
};

module.exports = {
  validateNewUser,
  validateUserOnChange,
  checkUserExists,
};
