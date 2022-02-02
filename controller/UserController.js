const UserModel = require("../models").Produk;

const index = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: ["id","kodeProduk", "namaProduk", "jumlah", "hargaSatuan"],
    });
    return res.json({
      status: "succsses",
      msg: "daftar user ditemukan",
      data: users,
    });
  } catch{
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
    const { namaProduk, hargaSatuan, jumlah } = req.body;
    const usersUpdate = await UserModel.findByPk(id);
    if (usersUpdate === null) {
      return res.json({
        status: "fail",
        msg: "gagal",
      });
    }
    await UserModel.update(
      {
        namaProduk,
        hargaSatuan,
        jumlah
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json({
      status: "Berhasil",
      messege: "Berhasil Diupdate",
    });
  } catch (error) {
    console.log(error);
    console.log(error);
    return res.status(403).json({
      status: "fail",
      msg: "fail",
    });
  }
};

module.exports = { index, detail, detailByEmail, destroy, update };
