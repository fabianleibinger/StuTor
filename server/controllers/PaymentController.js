import Stripe from 'stripe';
import Session from 'express-session';
import Payment from '../models/Payment.js';

const stripe = new Stripe('sk_test_51NHAGjBuAoJ2w5QopNPNnAdWTlA43tOCFfgKofUN2CUKOJArtX9KoKqcbMH5c1VTPl9RvBpTelUnnnmL72RBF2OG00YCMEmF01');
const session = new Session();

export const createAccount = async (req, res) => {
  console.log("in create account")
  const user = req.params.userId;
  console.log("req.body", req.body)
  //const user = "6468f36705853e6071dfec63"
  console.log("user", user)
  const existingPayment = await Payment.findOne({ user: user });
  if (!existingPayment) {
  try {
  const customer = await stripe.accounts.create({
    type: 'standard',
  });
  console.log("customerId:", customer.id);
  const payment = new Payment({
    user: user,
    customerId: customer.id,
  });
  const account = await payment.save();

  const accountLink = await stripe.accountLinks.create({
    account: payment.customerId,
    refresh_url: 'http://localhost:3001/api/payment/updateAccount',
    return_url: 'http://localhost:3000/userProfile',
    type: 'account_onboarding',
  });
  console.log("accountLink:", accountLink)
  console.log("accountLink.url:", accountLink.url)
  res.status(200).send({url: accountLink.url, userId: user, accountId: account.id});
} catch (err) {
  console.log("in catch error")
  console.log(err)
  res.status(500).send(err);
}
  } else {
    console.log("user already has payment")
    res.status(400).send("User already has a payment account!")
  }
}

export const updateAccount = async (req, res) => {
  console.log("in update account")
  const user = req.params.userId;
  try {
  const existingPayment = await Payment.findOne({ user: user });
  const exstingStripeAccount = await stripe.accounts.retrieve(
    existingPayment.customerId
  );
  } catch (err) {
    res.status(400).send("User has no payment account!")
  }
  if (existingPayment && exstingStripeAccount.charges_enabled == false) {
    try {
    const accountLink = await stripe.accountLinks.create({
      account: existingStripeAccount.customerId,
      refresh_url: 'http://localhost:3001/api/payment/updateAccount',
      return_url: 'http://localhost:3000/userProfile',
      type: 'account_onboarding',
    });
    console.log("accountLink:", accountLink)
    console.log("accountLink.url:", accountLink.url)
    res.status(200).send({url: accountLink.url, userId: user, accountId: existingPayment.id});
    } catch (err) {
      res.status(500).send("Failed to update account!")
    }
}
}

export const getAccount = async (req, res) => {
  try {
  const user = req.params.userId;
  const existingPayment = await Payment.findOne({ user: user });
  if (existingPayment) {
    try {
      const account = await stripe.accounts.retrieve(
        existingPayment.customerId
      );
      res.status(200).send({
        userId: existingPayment.user,
        accountId: existingPayment.id,
        charges_enabled: account.charges_enabled,
        details_submitted: account.details_submitted,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send("User has no payment account!")
  }
} catch (err) {
  res.status(500).send("Failed to get account!")
}
}

export const deleteAccount = async (req, res) => {
  console.log("in delete account")
  const user = req.body.userId;
  const existingPayment = await Payment.findOne({ user: user });
  if (existingPayment) {
    try {
    const deleted = await stripe.accounts.del(
      existingPayment.customerId
    );
    await Payment.findByIdAndDelete(existingPayment.id);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send("User has no payment account!")
  }
}

export const createPayment = async (req, res) => {
  const product = await stripe.products.create({
    name: 'test',
  });
  const productId = product.id
  const price = await stripe.prices.create({
    unit_amount: 2000,
    currency: 'eur',
    product: productId,
  });
  const user = req.body.user;
  console.log("user", user)
  const existingAccount = await Payment.findOne({ user: user });
  console.log("existingAccount", existingAccount)

  const stripeAccount = await stripe.accounts.retrieve(
    existingAccount.customerId
  );
 
  if (existingAccount && stripeAccount.charges_enabled == true) {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        payment_intent_data: {
          application_fee_amount: 1,
          transfer_data: {
            destination: existingAccount.customerId,
          },
        },
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
      });
      console.log(session);
      res.status(200).send(session);
    } catch (err) {
      console.log(err)
      res.status(400).send(err)
    }
  } else {
    console.log("no account")
    res.status(400).send("User has no payment account or it is not set up correctly!")
  }
}
