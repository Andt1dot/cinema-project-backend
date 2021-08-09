const router = require("express").Router();
const Users = require("../user/model");
const { validateNewUser } = require("../user/middleware");
const Notifications = require("../notification/model");
const { messageResetPassword } = require("../../services/email/message");
const {
  registeredAccess,
  checkUserRegister,
  сheckConfirmationRegister,
  validateUserOnPasswordReset,
  checkUserExist,
} = require("./middleware");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const message = require("../../services/email/message");
const twofactor = require("node-2fa");
const mongoose = require("mongoose");

router.post("/register", validateNewUser, async (req, res, next) => {
  const { firstname, lastname, age, email, username, password, mobile } =
    req.body;
  new Users({
    firstname,
    lastname,
    age,
    email,
    username,
    password: await bcrypt.hash(password, 14),
    mobile,
  })
    .save()
    .then((addedUser) => {
      const newToken = twofactor.generateToken(process.env.SECRET_2FA);
      message.messageConfirmRegister(addedUser.email, addedUser._id, newToken);
      return res.status(200).send({
        title: "Cod 200: Succes !!!",
        body: "Înregistrare cu succes, vă rugăm să verificați poșta electronică timp de 30 minute pentru a finaliza înregistrarea.",
        messageType: 200,
      });
      //return res.status(200).json(addedUser);
    })
    .catch(next);
});

router.post("/login", checkUserRegister, async (req, res, next) => {
  console.log("a intrat", req.user);
  const { _id, email, username, password, role, status } = req.user;

  const passwordValid = await bcrypt.compare(req.body.password, password);
  if (!passwordValid) {
    return res.status(401).json("%Invalid credentials%");
  }

  const token = jwt.sign(
    {
      _id,
      username,
      email,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  //res.cookie("token", token);

  return res.status(200).json({
    message: "SignIn Successful, Welcome to Olymp Cinema !!!",
    token,
    role,
  });
});

router.get("/logout", async (req, res, next) => {
  try {
    res.status(200).json("Logout successful !!!");
  } catch (error) {
    next();
  }
});

router.get("/check-auth", registeredAccess, async (req, res) => {
  console.log(req.decoded);
  res.status(200).json({
    isAuthenticated: true,
    isAdmin: req.decoded.role === 0 ? false : true,
  });
});

router.get(
  "/register-confirm/:token/:user_id",
  сheckConfirmationRegister,
  async (req, res, next) => {
    const result = twofactor.verifyToken(
      process.env.SECRET_2FA,
      req.params.token,
      (window = 30) //minut
    );

    if (!result || !mongoose.Types.ObjectId.isValid(req.params.user_id)) {
      Users.findByIdAndDelete(req.params.user_id)
        .exec()
        .then((response) => {
          return res.sendFile("expiredActivatedProfile.html", {
            root: "public",
          });
        });

    } else {
      await Users.findByIdAndUpdate(req.params.user_id, {
        status: "Active",
      })
        .exec()
        .then((user) => {
          return res.redirect(200,process.env.FRONTEND_APP + "/login");
        });
    }
  }
);

// password reset route
router.patch(
  "/reset-password",
  checkUserExist,
  validateUserOnPasswordReset,
  async (req, res, next) => {
    Users.findOneAndUpdate(
      {
        _id: req.body.user_id,
      },
      {
        password: await bcrypt.hash(req.body.new_password, 14),
      }
    )
      .exec()
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "error" });
        }
        return res.status(200).json({
          title: "Cod 200: Succes !!!",
          body: "Parola a fost modificată cu succes !",
          messageType: 200,
        });
      });
  }
);

router.post("/request/reset-password", async (req, res, next) => {
  console.log("email", req.body.email);
  await Users.findOne({ email: req.body.email, status: "Active" })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          title: "Cod 404: Eroare !!!",
          body: "Utilizator cu adresa indicată nu a fost identificat în sistem",
          messageType: 404,
        });
      } else {
        req.user = user;

        new Notifications({
          title: "Resetarea Parolei",
          content: "Apasati pe link-ul de mai jos pentru a reseta parola.",
          notification_type: "Reset",
          users: req.user_id,
        })
          .save()
          .then((newNotification) => {
            messageResetPassword(req.user.email, req.user._id);
          });
        return res.status(200).json({
          title: "Cod 200: Succes !!!",
          body: "Pe adresa indicată a fost expediată instrucțiunile  de resetare a parolei. Verificați vă rog poșta electronică !",
          messageType: 200,
        });
      }
    });
});

module.exports = router;
