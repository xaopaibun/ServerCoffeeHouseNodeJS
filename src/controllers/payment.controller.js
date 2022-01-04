const httpStatus = require('http-status');
const paypal = require('paypal-rest-sdk');
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

const success = catchAsync(async (req, res) => {
  const { paymentId, payerId, total } = req.query;
  const executePaymentJson = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: total.toString(),
        },
      },
    ],
  };
  paypal.payment.execute(paymentId, executePaymentJson, function (error, payment) {
    if (error) {
      res.status(400).send(error);
    } else {
      res.send(payment);
    }
  });
});

module.exports = { cancle, pay, success };
