import { first } from "lodash";
import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserPhoneNumber = (userPhoneNumber) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { phoneNumber: userPhoneNumber },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      //lưu ý, truyền vào đúng password cần hash
      // let hashPassWord = await bcrypt.hashSync("B4c0/\/", salt); => copy paste mà ko edit nè
      let hashPassWord = await bcrypt.hashSync(password, salt);

      resolve(hashPassWord);
    } catch (e) {
      reject(e);
    }
  });
};
let handleUserRegister = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExistEmail = await checkUserEmail(data.email);
      let isExistPhoneNumber = await checkUserPhoneNumber(data.phoneNumber);
      if (isExistEmail) {
        return resolve({
          status: 400,
          message: "Email is exist, please enter other email",
          data: "",
        });
      }

      if (isExistPhoneNumber) {
        return resolve({
          status: 400,
          message: "Phone number is exist, please enter other phone number",
          data: "",
        });
      }

      //hash user password
      let hashPassword = bcrypt.hashSync(data.password, salt);
      console.log(hashPassword);
      let user = await db.User.create({
        email: data.email,
        password: hashPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        image: data.image,
        roleId: "3",
        type_register: "1",
      });
      resolve({
        status: 201,
        message: "User is created successfully",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user already exist
        let user = await db.User.findOne({
          attributes: [
            "email",
            "roleId",
            "password",
            "firstName",
            "lastName",
            "id",
          ],
          where: { email: email },
          raw: true,
        });
        if (user) {
          //compare password: dùng cách 1 hay cách 2 đều chạy đúng cả =))
          // Cách 1: dùng asynchronous (bất đồng bộ)

          let check = await bcrypt.compare(password, user.password);

          // Cách 2: dùng synchronous  (đồng bộ)
          // let check = bcrypt.compareSync(password, user.password);

          if (check) {
            resolve({ status: 200, message: "OK", data: user });

            delete user.password;
          } else {
            resolve({ status: 401, message: "Wrong password", data: "" });
          }
        } else {
          resolve({
            status: 404,
            message: "User not found",
            data: "",
          });
        }
      } else {
        //return error
        resolve({
          status: 404,
          message:
            "Your's Email isn't exist in our system, plz try other email",
          data: "",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCodeUserService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          status: 400,
          message: "Missing required parameter",
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.status = 0;
        res.data = allcode;
        resolve(res);
      }

      // let res = {};
      // let allcode = await db.Allcode.findAll({
      //   where: { type: typeInput },
      // });
      // res.status = 0;
      // res.data = allcode;
      // resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExistEmail = await checkUserEmail(data.email);
      let isExistPhoneNumber = await checkUserPhoneNumber(data.phoneNumber);
      if (isExistEmail) {
        return resolve({
          status: 400,
          message: "Email is exist, please enter other email",
          data: "",
        });
      }

      if (isExistPhoneNumber) {
        return resolve({
          status: 400,
          message: "Phone number is exist, please enter other phone number",
          data: "",
        });
      }

      //hash user password
      let hashPassword = bcrypt.hashSync(data.password, salt);

      let user = await db.User.create({
        email: data.email,
        password: hashPassword.toString(),
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        image: data.image,
        roleId: data.roleId,
        type_register: "1",
      });
      resolve({
        status: 201,
        message: "User is created successfully",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });

      if (user) {
        resolve({
          status: 200,
          message: "get user by id successfully",
          data: user,
        });
      } else {
        resolve({
          status: 404,
          message: "User not found",
          data: "",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();

        resolve({
          status: 200,
          message: "Update the user successfully!",
          data: user,
        });
      } else {
        resolve({
          status: 404,
          message: "User not found!",
          data: "",
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (!user) {
        return resolve({
          status: 404,
          message: "User not found!",
          data: "",
        });
      }
      if (user) {
        await db.User.destroy({ where: { id: userId } });
      }
      resolve({
        status: 200,
        message: "user is deleted",
        data: "",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  getAllCodeUserService: getAllCodeUserService,
  handleUserRegister,
  createNewUser: createNewUser,
  getUserInfoById: getUserInfoById,
  updateUserData: updateUserData,
  deleteUser: deleteUser,
};
