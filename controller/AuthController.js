const UserModel = require("../models").Produk;
const bcrypt = require("bcrypt");


const register =  async (req, res) => {
    try {
      let body = req.body;
      const users = await UserModel.create(body);
      console.log(users);

      res.json({
        status: "success",
        msg: "Register berhasil",
      });
    } catch (err) {
      console.log(err);
    }
  }

  module.exports = {register}