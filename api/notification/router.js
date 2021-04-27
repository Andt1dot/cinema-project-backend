const router = require("express").Router();
const Notifications = require("./model");
const middleware = require("./middleware");

router.get("/", async (req, res, next) => {
  Notifications.find()
    .exec()
    .then((notification) => {
      res.status(200).json(notification);
    })
    .catch(next);
});

router.get(
  "/:notification_id",
  middleware.checkNotificationExists,
  async (req, res, next) => {
    Notifications.findById(req.params.notification_id)
      .exec()
      .then((notification) => {
        res.status(200).json(notification);
      })
      .catch(next);
  }
);

router.post("/", middleware.validateNewNotification, async (req, res, next) => {
  new Notifications(req.body)
    .save()
    .then((newNotification) => {
      res.status(200).json(newNotification);
    })
    .catch(next);
});

router.put(
  "/:notification_id",
  middleware.checkNotificationExists,
  middleware.validateNewNotification,
  async (req, res, next) => {
    const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
      acc[curr] = req.body[curr];
      return acc;
    }, {});

    Notifications.findByIdAndUpdate(req.params.notification_id, bodyReducer)
      .exec()
      .then((updatedNoitification) => {
        res.status(200).json(updatedNoitification);
      })
      .catch(next);
  }
);

router.delete(
  "/:notification_id",
  middleware.checkNotificationExists,
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
