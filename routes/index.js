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
  "/produk",
  validationRegister,
  validationMiddleware,
  register
);

//user
router.get("/produk",index);
router.get("/produk/:id", detail)
router.get("/produk/email/:email",detailByEmail)
router.delete("/produk/:id", destroy)
router.put("/produk/update/:id", update)

module.exports = router;
