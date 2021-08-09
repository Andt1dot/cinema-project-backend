const Users = require("../user/model");
const Notifications = require("../notification/model");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const registeredAccess = async (req, res, next) => {
  const token = req.headers.authorization;
  //console.log(req.headers);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, please SignIn !!!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Token invalid, please SignIn !!!" });
    }

    const { _id, email, role } = decoded;

    Users.findOne({ _id, email, role })
      .exec()
      .then((user) => {
        if (!user) {
          res.status(401).json({ message: "Unauthorized, please SignIn !!!" });
        }
      });

    req.decoded = decoded;

    next();
  });
};
//----------------------------------------------------------------------------------------------//

const staffAccess = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, please SignIn !!!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Token invalid, please SignIn !!!" });
    }
    req.decoded = decoded;
    const { role } = req.decoded;
    if (!role || role === 0) {
      return res.status(403).json("No privileges for resource access.");
    } else {
      next();
    }
  });
};

//----------------------------------------------------------------------------------------------//

const checkUserRegister = async (req, res, next) => {
  //----------------------Password-----------------------------------------//
  await check("password")
    .notEmpty()
    .withMessage("%Password is required%")
    .run(req);

  await check("email").notEmpty().withMessage("%Email is required%").run(req);

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
  // ------------------------Email---------------------------------//

  await check("email")
    .isEmail()
    .withMessage("%The specified email does not match the rules%")
    .run(req);

  await check("email")
    .custom((email) => {
      return Users.findOne({
        email,
      }).then((user) => {
        if (user.status === "Active") {
          req.user = user;
        } else if (user.status === "Pending") {
          return res
            .status(401)
            .json("%Pending Account.Please verify your email!%");
        } else {
          return res.status(404).json("%Account not exist%");
        }
      });
    })
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

//----------------------------------------------------------------------------------------------//

const validateUserIdentity = async (req, res, next) => {
  console.log("Decoded", req.decoded);
  console.log("Params", req.params.user_id);
  if (req.decoded._id !== req.params.user_id && req.decoded.role === 0) {
    return res.status(403).json("Forbidden.");
  }
  next();
};

////// acest middleware "сheckConfirmationRegister" se executa atunci cand user-ul apasa pe butonul "Activeaza contul" din email,
///// daca contul a fost activat deja, se arunca eroarea din else, daca nu => next()

const сheckConfirmationRegister = async (req, res, next) => {
  await Users.findOne({ _id: req.params.user_id, status: "Active" })
    .exec()
    .then((user) => {
      if (!user) {
        next();
      } else {
        return res.sendFile("alerdayActivatedProfile.html", { root: "public" });
        // "%Account is already activated thanks for choosing Olymp Cinema%"
      }
    });
};

const checkUserExist = async (req, res, next) => {
  await Users.findOne({ _id: req.body.user_id, status: "Active" })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Utilizator inexistent" });
      }
      next();
    });
};

// acest middleware "validateUserOnPasswordReset" cauta user-ul in baza de date, conform email-ului furnizat.
// daca il gaseste => trimite mesaj cu linkul de resetare a parolei, daca nu => message: "You don`t have account"

const validateUserOnPasswordReset = async (req, res, next) => {
  await check("new_password")
    .notEmpty()
    .withMessage("%Cîmpul parola este obligatoriu%")
    .run(req);

  await check("new_password")
    .isLength({ min: 8, max: 15 })
    .withMessage(
      "%Parola trebuie să conțină o lugime cuprinsă între 8-15 caractere%"
    )
    .run(req);

  await check("new_password")
    .matches(/\d/)
    .withMessage("%Parola trebuie să conțină cel puțin un număr%")
    .run(req);

  await check("new_password")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("%Parola trebuie să conțină cel puțin un caracter special %")
    .run(req);

  await check("new_password")
    .custom((new_password) => {
      return Users.findById(req.body.user_id).then((user) => {
        bcrypt.compare(new_password, user.password).then((passwordRepeat) => {
          if (passwordRepeat) {
            return res
              .status(400)
              .json("%Parola este identică cu cea curentă%");
          }
        });
      });
    })
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
// const validateUserOnPasswordReset = async (req, res, next) => {
//   console.log("email", req.body.email);
//   await Users.findOne({ email: req.body.email, status: "Active" })
//     .exec()
//     .then((user) => {
//       if (!user) {
//         return res.status(404).json({ message: "You don't have acount." });
//       } else {
//         req.user = user;
//         new Notifications({
//           title: "Resetarea Parolei",
//           content: "Apasati pe link-ul de mai jos pentru a reseta parola.",
//           notification_type: "Reset",
//         })
//           .save()
//           .then((newNotification) => {
//             notificationSendEmail(
//               req.user.email,
//               newNotification.title,
//               newNotification.content
//             );
//           });

//         next();
//       }
//    });
//};

module.exports = {
  registeredAccess,
  checkUserRegister,
  staffAccess,
  validateUserIdentity,
  сheckConfirmationRegister,
  validateUserOnPasswordReset,
  checkUserExist,
};
