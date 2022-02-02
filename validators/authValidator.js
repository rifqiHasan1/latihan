const { check } = require("express-validator");
const UserModel = require("../models").Produk;

const validationRegister = [
    check("kodeProduk")
      .custom((value) => {
        return UserModel.findOne({
          where: {
            kodeProduk: value,
          },
        }).then((user) => {
          if (user) {
            return Promise.reject("kode sudah digunakan");
          }
        });
      }),
    check("namaProduk").isLength({ min: 1 }).withMessage("namaProduk wajib 8"),
    check("jumlah").isLength({ min: 1 }).withMessage("jumlah wajib 8"),
    check("hargaSatuan").isLength({ min: 1 }).withMessage("hargaSatuan wajib 8"),
];

module.exports = {validationRegister}