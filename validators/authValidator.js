const { check } = require("express-validator");
const UserModel = require("../models").user;

const validationRegister = [
    check("name").isLength({ min: 1 }).withMessage("nama wajib diisi"),
    check("email")
      .isEmail()
      .withMessage("Gunakan Email Valid")
      .custom((value) => {
        return UserModel.findOne({
          where: {
            email: value,
          },
        }).then((user) => {
          if (user) {
            return Promise.reject("Email sudah Digunakan");
          }
        });
      }),
    check("password").isLength({ min: 8 }).withMessage("password wajib 8"),
    check("status")
      .isIn(["active", "nonactive"])
      .withMessage("status bukan enum"),
    check("jenisKelamin")
      .isIn(["laki-laki", "perempuan"])
      .withMessage("jenis-kelamin hanya laki-laki dan perempuan"),
  
];

module.exports = {validationRegister}