const httpStatus = require('http-status');
const paypal = require('paypal-rest-sdk');
const { Order } = require('../models');
const { userService } = require('../services');
const catchAsync = require('../utils/catchAsync');

paypal.configure({
  mode: 'sandbox',
  client_id: 'AZOAftCP5T_kt0gk1_4xuG3rPLmR_mTmzhNSiEOlSrS-AfOD4YUEZdU2upoPWUBglPlGm676NckIARFZ',
  client_secret: 'ENiqc0sAmtDng4UwmqhddExeOLDgtMPHCr5zaTZ7DCwPXvjh81UL77T8jrJdU7DD1WjbL3ROzpK8D-AJ',
});

const cancle = catchAsync(async (req, res) => {
  res.status(httpStatus.CREATED).send('cancle');
});

const pay = catchAsync(async (req, res) => {
  const { cart } = req.body;
  let total = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < cart.length; i++) {
    total += parseFloat(cart[i].price) * cart[i].quantity;
  }
  const createPaymentJson = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: `http://localhost:8000/v1/payment/success?total=${total}`,
      cancel_url: 'http://localhost:8000/v1/payment/cancel',
    },
    transactions: [
      {
        item_list: {
          items: cart,
        },
        amount: {
          currency: 'USD',
          total: total.toString(),
        },
      },
    ],
  };
  paypal.payment.create(createPaymentJson, function (error, payment) {
    if (error) {
      res.send(error);
    } else {
      res.send(payment);
    }
  });
});

const success = catchAsync(async (req, res, next) => {
  const { paymentId } = req.query;
  const payerId = { payer_id: req.query.PayerID };
  paypal.payment.execute(paymentId, payerId, async function (error, payment) {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(JSON.stringify(error));
      return next(error);
    }
    if (payment.state === 'approved') {
      const user = await userService.getUserByEmail(payment.payer.payer_info.email);
      if (user) {
        const orderDetail = {
          _idOrder: payment.id,
          user_id: user._id,
          email: user.email,
          full_name: user.name,
          phone_number: user.phone || '',
          total_money: payment.transactions[0].amount.total,
          address: user.address,
          status: 1,
          payment: 2,
          shipping_information: 1,
          list_product: payment.transactions[0].item_list.items,
        };
        Order.create({ ...orderDetail });
        res.json({ payment });
      } else {
        const orderDetail = {
          _idOrder: payment.id,
          email: payment.payer.payer_info.email,
          full_name: payment.payer.payer_info.shipping_address.recipient_name,
          phone_number: '',
          total_money: payment.transactions[0].amount.total,
          address: `${payment.payer.payer_info.shipping_address.line1} ${payment.payer.payer_info.shipping_address.city}`,
          status: 1,
          payment: 2,
          shipping_information: 1,
          list_product: payment.transactions[0].item_list.items,
        };
        Order.create({ ...orderDetail });
        res.json({ payment });
      }
    } else {
      res.json({ payment: 'not success' });
    }
  });
});

const execute = catchAsync(async (req, res) => {
  paypal.billingAgreement.execute(req.body.paymentID, {}, (err, bg) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(bg);
    }
  });
});

module.exports = { cancle, pay, success, execute };
