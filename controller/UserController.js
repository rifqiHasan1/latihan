const UserModel = require("../models").user;

const index = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: ["name", "email", "id", "jenisKelamin"],
    });
    return res.json({
      status: "succsses",
      msg: "daftar user ditemukan",
      data: users,
    });
  } catch {
    console.log(err);
    return res.status(403).json({
      status: "fail",
      message: "ada kesalahan",
    });
  }
};

const detail = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await UserModel.findByPk(id);
    if (users === null) {
      return res.json({
        status: "fail",
        msg: "daftar user tidak ditemukan",
      });
    }
    return res.json({
      status: "succsses",
      msg: "daftar user ditemukan",
      data: users,
    });
  } catch {
    console.log(err);
    return res.status(403).json({
      status: "fail",
      message: "ada kesalahan",
    });
  }
};

const detailByEmail = async (req, res) => {
  // const {email} = req.params

  try {
    const email = req.params.email;
    const users = await UserModel.findOne({
      where: {
        email: email,
      },
    });

    if (users === null) {
      return res.json({
        status: "fail",
        msg: "daftar user tidak ditemukan",
      });
    }
    return res.json({
      status: "succsses",
      msg: "daftar user ditemukan",
      data: users,
    });
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      status: "fail",
      message: "ada kesalahan",
    });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const users = await UserModel.destroy({
      where: {
        id: id,
      },
    });

    if (users === 0) {
      return res.json({
        status: "fail",
        msg: "User tidak ditemukan",
      });
    }
    return res.json({
      status: "succsses",
      msg: "User berhasil dihapus",
      data: users,
    });
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      status: "fail",
      message: "ada kesalahan",
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const users = await UserModel.findByPk(id);
    if (users === null) {
      return res.json({
        status: "fail",
        msg: "User tidak ditemukan",
      });
    }

    await UserModel.update(
      {
        name: name,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.json({
        status: "success",
        msg: "Data user berhasil diperbaharui"
    });
  } catch (err) {
    return res.status(403).json({
      status: "fail",
      msg: "Ada Kesalahan",
    });
  }
};

module.exports = { index, detail, detailByEmail, destroy, update };
