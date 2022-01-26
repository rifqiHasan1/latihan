const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const { register } = require("../controller/AuthController");
const validationMiddleware = require("../middleware/validationMiddleware");
const { validationRegister } = require("../validators/authValidator");
const {index,detail, detailByEmail, destroy, update} = require("../controller/UserController")

router.get("/", (req, res) => {
  res.json({
    status: "ok",
  });
});
router.post(
  "/register",
  validationRegister,
  validationMiddleware,
  register
);

//user
router.get("/users",index);
router.get("/users/:id", detail)
router.get("/users/email/:email",detailByEmail)
router.delete("/users/:id", destroy)
router.put("/users/update/:id", update)

module.exports = router;
