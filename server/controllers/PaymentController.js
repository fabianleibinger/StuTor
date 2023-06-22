import Stripe from 'stripe';
import Session from 'express-session';
import Payment from '../models/Payment.js';

const stripe = new Stripe('sk_test_51NHAGjBuAoJ2w5QopNPNnAdWTlA43tOCFfgKofUN2CUKOJArtX9KoKqcbMH5c1VTPl9RvBpTelUnnnmL72RBF2OG00YCMEmF01');
const session = new Session();

export const createAccount = async (req, res) => {
  console.log("in create account")
  //const user = req.body.user;
  const user = "6468f36705853e6071dfec63"
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
    refresh_url: 'https://example.com/reauth',
    return_url: 'http://localhost:3000',
    type: 'account_onboarding',
  });
  console.log("accountLink:", accountLink)

  res.status(200).send(account);
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

export const getAccount = async (req, res) => {
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
      res.status(400).send(err);
    }
  } else {
    const account = await stripe.accounts.retrieve(
      'cus_O86HdgLdNGNvS5'
    )
    console.log(account)
    res.status(400).send("User has no payment account!")
  }
}

export const deleteAccount = async (req, res) => {
  const user = req.body.user;
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



export const onboardUser = async (req, res) => {
    try {
        console.log("onboardUser")
        //console.log(req.session)
        //console.log(Stripe)

        const account = await stripe.accounts.create({
          type: 'standard',
        });
        console.log("Nach account")
        console.log(account.id)
    
        // Store the ID of the new Standard connected account.
        try {
            //req.sessionID is undefined -> why?
            req.session.accountID = account.id;
        } catch (err) {
            console.log(err)
        }
        //console.log("req.session.accountID: ", req.session.accountID)
    
        const origin = `${req.headers.origin}`;
        console.log("origin: ", origin)
        const accountLink = await stripe.accountLinks.create({
          type: "account_onboarding",
          account: account.id,
          refresh_url: `${origin}/api/payment/onboardUserRefresh`,
          return_url: `${origin}/success.html`,
        });
        console.log("accountLink: ", accountLink)
        console.log("This is the accountLink:", accountLink)
        
        //const body = await res.json()
        //window.location.href = body.url
        //res.header("Access-Control-Allow-Origin", "*");
        res.redirect(303, accountLink.url);
        console.log("after redirect")
        //res.redirect('https://www.google.com/search?q=google&rlz=1C5CHFA_enDE970DE970&oq=google&aqs=chrome.0.0i67i131i355i433i650j46i67i131i199i433i465i650j0i131i433i512j0i67i131i433i650l2j0i67i650l2j69i60.1018j0j7&sourceid=chrome&ie=UTF-8');
      } catch (err) {
        res.status(500).send({
          error: err.message,
        });
      }
    };

export const onboardUserRefresh = async (req, res) => {
    console.log("refresh", req.session)
    if (!req.session.accountID) {
        res.redirect("/");
        return;
      }
    
      try {
        const { accountID } = req.session;
        const origin = `${req.secure ? "https://" : "http://"}${req.headers.host}`;
    
        const accountLink = await stripe.accountLinks.create({
          type: "account_onboarding",
          account: accountID,
          refresh_url: `${origin}/api/payment/onboardUserRefresh`,
          return_url: `${origin}/success.html`,
        });
    
        res.redirect(303, accountLink.url);
      } catch (err) {
        res.status(500).send({
          error: err.message,
        });
      }
    };