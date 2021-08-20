const { check, validationResult } = require("express-validator");
const Notifications = require("./model");

const validateNewNotification = async (req, res, next) => {
  await check("title")
    .notEmpty()
    .withMessage("Title for notification is required.")
    .run(req);

  await check("title")
    .isLength({ min: 3 })
    .withMessage("Title for notification is required.")
    .run(req);

  await check("content")
    .notEmpty()
    .withMessage("Content for notification is required.")
    .run(req);

  await check("content")
    .isLength({ min: 10 })
    .withMessage("Content for notification is required.")
    .run(req);

  await check("notification_type")
    .notEmpty()
    .withMessage("Notification type is required.")
    .run(req);

  await check("notification_type")
    .isIn(["Promo", "Auth", "Ticket", "Reset", "Support"])
    .withMessage("Notification type is undefined")
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

const checkNotificationExists = async (req, res, next) => {
  Notifications.findById(req.params.notification_id)
    .then((notification) => {
      if (!notification) {
        return res.status(404).json("Notification is not found. ");
      }
      next();
    })
    .catch(next);
};

module.exports = {
  validateNewNotification,
  checkNotificationExists,
};
