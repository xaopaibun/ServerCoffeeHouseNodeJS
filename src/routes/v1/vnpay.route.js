const express = require('express');

const router = express.Router();
const querystring = require('qs');
const dateFormat = require('dateformat');
const crypto = require('crypto');
const dayjs = require('dayjs');
// eslint-disable-next-line import/no-unresolved, import/extensions

const config = {
  vnp_TmnCode: '10NDP1EB',
  vnp_HashSecret: 'KJPEJITFXFFURESRUYIDXJEQJECCZHKR',
  vnp_Url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
  vnp_ReturnUrl: 'http://localhost:8000/v1/pay/vnpay_return',
};
function sortObject(obj) {
  const sorted = {};
  const str = [];
  let key;
  // eslint-disable-next-line no-restricted-syntax
  for (let key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
  }
  return sorted;
}

router.get('/create_payment_url', function (req, res) {
  const date = new Date();

  const desc = `Thanh toan don hang thoi gian: ${dateFormat(date, 'yyyy-mm-dd HH:mm:ss')}`;
  res.render('order', { title: 'Tạo mới đơn hàng', amount: 10000, description: desc });
});

router.post('/create_payment_url', function (req, res) {
  const ipAddr =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  const tmnCode = config.vnp_TmnCode;
  const secretKey = config.vnp_HashSecret;
  let vnpUrl = config.vnp_Url;
  const returnUrl = config.vnp_ReturnUrl;

  const date = dayjs();
  console.log(222, date);
  const createDate = dateFormat(date, 'yyyymmddHHMMss');
  console.log('111', createDate);
  const orderId = dateFormat(date, 'HHmmss');
  const { amount, bankCode, orderType, language, orderDescription } = req.body;
  const orderInfo = orderDescription;

  let locale = language;
  if (locale === null || locale === '') {
    locale = 'vn';
  }
  const currCode = 'VND';
  // eslint-disable-next-line camelcase
  let vnp_Params = {};
  vnp_Params.vnp_Version = '2.1.0';
  vnp_Params.vnp_Command = 'pay';
  vnp_Params.vnp_TmnCode = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params.vnp_Locale = locale;
  vnp_Params.vnp_CurrCode = currCode;
  vnp_Params.vnp_TxnRef = orderId;
  vnp_Params.vnp_OrderInfo = orderInfo;
  vnp_Params.vnp_OrderType = orderType;
  vnp_Params.vnp_Amount = amount * 100;
  vnp_Params.vnp_ReturnUrl = returnUrl;
  vnp_Params.vnp_IpAddr = ipAddr;
  vnp_Params.vnp_CreateDate = createDate;
  if (bankCode !== null && bankCode !== '') {
    vnp_Params.vnp_BankCode = bankCode;
  }

  // eslint-disable-next-line camelcase
  vnp_Params = sortObject(vnp_Params);

  // eslint-disable-next-line import/no-extraneous-dependencies
  const signData = querystring.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac('sha512', secretKey);
  // eslint-disable-next-line security/detect-new-buffer, no-buffer-constructor
  const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
  vnp_Params.vnp_SecureHash = signed;
  // eslint-disable-next-line no-const-assign
  vnpUrl += `?${querystring.stringify(vnp_Params, { encode: false })}`;

  res.send({ vnpUrl });
});

router.get('/vnpay_return', function (req, res) {
  // eslint-disable-next-line camelcase
  let vnp_Params = req.query;

  const secureHash = vnp_Params.vnp_SecureHash;

  delete vnp_Params.vnp_SecureHash;
  delete vnp_Params.vnp_SecureHashType;

  // eslint-disable-next-line camelcase
  vnp_Params = sortObject(vnp_Params);

  const secretKey = config.vnp_HashSecret;

  const signData = querystring.stringify(vnp_Params, { encode: false });
  // eslint-disable-next-line global-require, no-shadow
  const hmac = crypto.createHmac('sha512', secretKey);
  // eslint-disable-next-line security/detect-new-buffer, no-buffer-constructor
  const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

  if (secureHash === signed) {
    // Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

    res.send({ code: vnp_Params.vnp_ResponseCode });
  } else {
    res.send({ code: '97' });
  }
});

// router.get('/vnpay_ipn', function (req, res, next) {
//   let vnp_Params = req.query;
//   let secureHash = vnp_Params.vnp_SecureHash;

//   delete vnp_Params.vnp_SecureHash;
//   delete vnp_Params.vnp_SecureHashType;

//   vnp_Params = sortObject(vnp_Params);
//   let config = require('config');
//   let secretKey = config.get('vnp_HashSecret');
//   let querystring = require('qs');
//   let signData = querystring.stringify(vnp_Params, { encode: false });
//   let crypto = require('crypto');
//   let hmac = crypto.createHmac('sha512', secretKey);
//   let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

//   if (secureHash === signed) {
//     let orderId = vnp_Params.vnp_TxnRef;
//     let rspCode = vnp_Params.vnp_ResponseCode;
//     //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
//     res.status(200).json({ RspCode: '00', Message: 'success' });
//   } else {
//     res.status(200).json({ RspCode: '97', Message: 'Fail checksum' });
//   }
// });

module.exports = router;
