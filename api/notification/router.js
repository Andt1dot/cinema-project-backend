const router = require("express").Router();
const Notifications = require("./model");
const { inBoxMessage } = require("../../services/email/message");

const {
  checkNotificationExists,
  validateNewNotification,
} = require("./middleware");
const {
  registeredAccess,
  staffAccess,
  validateUserIdentity,
} = require("../auth/middleware");
const { notificationSendEmail } = require("../../services/email/message");

router.get("/", staffAccess, async (req, res, next) => {
  Notifications.find()
    .exec()
    .then((notifications) => {
      res.status(200).json(notifications);
    })
    .catch(next);
});

router.get(
  "/:notification_id",
  staffAccess,
  checkNotificationExists,
  async (req, res, next) => {
    Notifications.findById(req.params.notification_id)
      .exec()
      .then((notification) => {
        res.status(200).json(notification);
      })
      .catch(next);
  }
);

router.get(
  "/:user_id/notifications",
  registeredAccess,
  validateUserIdentity,
  async (req, res, next) => {
    await Notifications.find({
      users: req.params.user_id,
    })
      .then((notifications) => {
        return res.status(200).json(notifications);
      })
      .catch(next);
  }
);

router.post(
  "/",
  staffAccess,
  validateNewNotification,
  async (req, res, next) => {
    new Notifications(req.body)
      .save()
      .then((newNotification) => {
        newNotification
          .populate("users", "email -_id")
          .execPopulate((error, notification) => {
            notification.users.forEach((user) => {
              notificationSendEmail(
                user.email,
                notification.title,
                notification.content
              );
            });
          });
        res.status(201).json(newNotification);
      })
      .catch(next);
  }
);

router.post("/guest", validateNewNotification, async (req, res, next) => {
  console.log(req.body);
  const { title, email, content, connection_type, notification_type } =
    req.body;
  new Notifications({
    title,
    email,
    content,
    connection_type,
    notification_type,
  })
    .save()
    .then((newNotification) => {
      inBoxMessage(email, content, title);
      res.status(201).json({
        title: "Cod 200: Succes !!!",
        body: "Vă mulțumim, mesajul a fost expediat cu succes către echipa - Olymp Cinema !!!",
        messageType: 200,
      });
    })
    .catch(next);
});

router.put(
  "/:notification_id",
  staffAccess,
  checkNotificationExists,
  async (req, res, next) => {
    const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
      acc[curr] = req.body[curr];
      return acc;
    }, {});

    Notifications.findByIdAndUpdate(req.params.notification_id, bodyReducer)
      .exec()
      .then((updatedNotification) => {
        res.status(200).json(updatedNotification);
      })
      .catch(next);
  }
);

router.delete(
  "/:notification_id",
  staffAccess,
  checkNotificationExists,
  async (req, res, next) => {
    Notifications.findByIdAndDelete(req.params.notification_id)
      .exec()
      .then((deletedNotification) => {
        res.status(200).json(deletedNotification);
      })
      .catch(next);
  }
);

module.exports = router;
