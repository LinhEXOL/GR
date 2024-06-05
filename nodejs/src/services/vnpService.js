const e = require("express");
import db from "../models/index";
const shortUUID = require("short-uuid");
const moment = require("moment");
import mailer from "./mailService";

const tmnCode = "HSMY45J3";
const secretKey = "P8RDKPM5JGHHJWKEDRER8WB2HZ0WHDAC";
const returnUrl = "http://localhost:8080/api/vnpay_return";
let createPaymentWithVNP = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      process.env.TZ = "Asia/Ho_Chi_Minh";

      let invoice = await db.Invoice.create({
        id: shortUUID.generate(),
        orderId: req.body.orderId,
        received: req.body.received,
        type: req.body.type,
        change: req.body.change,
      });

      let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
      let date = new Date();
      let createDate = moment(date).format("YYYYMMDDHHmmss");

      let ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

      let orderId = invoice.id;
      let amount = req.body.amount;
      let bankCode = req.body.bankCode;

      let locale = req.body.language;
      if (locale === null || locale === "") {
        locale = "vn";
      }
      let currCode = "VND";
      let vnp_Params = {};
      vnp_Params["vnp_Version"] = "2.1.0";
      vnp_Params["vnp_Command"] = "pay";
      vnp_Params["vnp_TmnCode"] = tmnCode;
      vnp_Params["vnp_Locale"] = locale;
      vnp_Params["vnp_CurrCode"] = currCode;
      vnp_Params["vnp_TxnRef"] = orderId;
      vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
      vnp_Params["vnp_OrderType"] = "other";
      vnp_Params["vnp_Amount"] = amount * 100;
      vnp_Params["vnp_ReturnUrl"] = returnUrl;
      vnp_Params["vnp_IpAddr"] = ipAddr;
      vnp_Params["vnp_CreateDate"] = createDate;
      if (bankCode !== null && bankCode !== "") {
        vnp_Params["vnp_BankCode"] = bankCode;
      }

      vnp_Params = sortObject(vnp_Params);

      let querystring = require("qs");
      let signData = querystring.stringify(vnp_Params, { encode: false });
      let crypto = require("crypto");
      let hmac = crypto.createHmac("sha512", secretKey);
      let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
      vnp_Params["vnp_SecureHash"] = signed;
      vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

      resolve({
        status: 200,
        message: "success",
        data: vnpUrl,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getReturn = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let vnp_Params = req.query;

      let secureHash = vnp_Params["vnp_SecureHash"];

      delete vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_SecureHashType"];

      vnp_Params = sortObject(vnp_Params);
      console.log("🚀 ~ returnnewPromise ~ vnp_Params:", vnp_Params);
      let querystring = require("qs");
      let signData = querystring.stringify(vnp_Params, { encode: false });
      let crypto = require("crypto");
      let hmac = crypto.createHmac("sha512", secretKey);
      let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

      if (secureHash === signed) {
        let invoice = await db.Invoice.findOne({
          where: { id: vnp_Params["vnp_TxnRef"] },
          raw: false,
        });
        if (!invoice) {
          resolve({
            status: 404,
            message: "Order is not exist",
            data: "",
          });
        }

        console.log("🚀 ~ returnnewPromise ~ invoice:", invoice);
        let order = await db.Order.findOne({
          where: { id: invoice.orderId },
          raw: false,
        });
        console.log("🚀 ~ returnnewPromise ~ order:", order);
        if (
          invoice.type === "deposit" &&
          invoice.received !== vnp_Params["vnp_Amount"] / 100
        ) {
          resolve({
            status: 400,
            message: "Amount is not match",
            data: "",
          });
        }

        if (
          invoice.type === "checkout" &&
          order.totalAmount - order.depositAmount !==
            vnp_Params["vnp_Amount"] / 100
        ) {
          resolve({
            status: 400,
            message: "Amount is not match",
            data: "",
          });
        }

        if (vnp_Params["vnp_ResponseCode"] == "00") {
          if (invoice.type === "deposit") {
            order.paymentStatus = "deposited";
            order.resStatus = "confirmed";
            await order.save();
            console.log("update order status");
          }
          if (invoice.type === "checkout") {
            order.paymentStatus = "paid";
            order.resStatus = "done";
            await order.save();
          }
          if (invoice.type === "refund") {
            order.paymentStatus = "refunded";
            order.resStatus = "cancel";
            await order.save();
          }
          invoice.status = "success";
          await mailer.notifyOrderPlaceSuccess(order);
          console.log("update invoice status");
          await invoice.save();
          resolve({
            status: 200,
            message: "success",
          });
        } else {
          invoice.status = "failed";
          await invoice.save();
          resolve({
            status: 400,
            message: "Payment failed",
          });
        }
      } else {
        reject("Invalid signature");
      }
    } catch (e) {
      reject(e);
    }
  });
};

const vnpayIPN = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let vnp_Params = req.query;

      let secureHash = vnp_Params["vnp_SecureHash"];

      delete vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_SecureHashType"];

      vnp_Params = sortObject(vnp_Params);

      let config = require("config");
      let tmnCode = config.get("vnp_TmnCode");
      let secretKey = config.get("vnp_HashSecret");

      let querystring = require("qs");
      let signData = querystring.stringify(vnp_Params, { encode: false });
      let crypto = require("crypto");
      let hmac = crypto.createHmac("sha512", secretKey);
      let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

      if (secureHash === signed) {
        res.render("success", { code: vnp_Params["vnp_ResponseCode"] });
      } else {
        res.render("success", { code: "97" });
      }
    } catch (e) {
      reject(e);
    }
  });
};

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

module.exports = {
  createPaymentWithVNP,
  getReturn,
};
