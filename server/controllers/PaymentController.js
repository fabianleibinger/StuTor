import Stripe from "stripe";
import Session from "express-session";
import Payment from "../models/Payment.js";
import Studysession from "../models/Studysession.js";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import { ObjectId } from "mongodb";

const stripe = new Stripe(
  "sk_test_51NHAGjBuAoJ2w5QopNPNnAdWTlA43tOCFfgKofUN2CUKOJArtX9KoKqcbMH5c1VTPl9RvBpTelUnnnmL72RBF2OG00YCMEmF01"
);

export const createAccount = async (req, res) => {
  const user = req.params.userId;
  // Check if user already has a payment account.
  const existingPayment = await Payment.findOne({ user: user });
  if (!existingPayment) {
    try {
      const customer = await stripe.accounts.create({
        type: "express",
      });
      const payment = new Payment({
        user: user,
        customerId: customer.id,
      });
      const account = await payment.save();

      const accountLink = await stripe.accountLinks.create({
        account: payment.customerId,
        refresh_url: "http://localhost:3000/userProfile",
        return_url: "http://localhost:3000/userProfile",
        type: "account_onboarding",
      });
      res
        .status(200)
        .send({ url: accountLink.url, userId: user, accountId: account.id });
    } catch (err) {
      res.status(500).send("Failed to create stripe account!");
    }
  } else {
    res.status(400).send("User already has a payment account!");
  }
};

export const updateAccount = async (req, res) => {
  const user = req.params.userId;
  try {
    // Get existing payment account for user.
    const existingPayment = await Payment.findOne({ user: user });
    const existingStripeAccount = await stripe.accounts.retrieve(
      existingPayment.customerId
    );
    // Only create new account link if user has a payment account and charges are disabled.
    if (existingPayment && existingStripeAccount.charges_enabled == false) {
      try {
        const accountLink = await stripe.accountLinks.create({
          account: existingPayment.customerId,
          refresh_url: "http://localhost:3000/userProfile",
          return_url: "http://localhost:3000/userProfile",
          type: "account_onboarding",
        });
        res.status(200).send({
          url: accountLink.url,
          userId: user,
          accountId: existingPayment.id,
        });
      } catch (err) {
        res.status(500).send("Failed to update account!");
      }
    }
  } catch (err) {
    res.status(400).send("User has no payment account!");
  }
};

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
      res.status(400).send("User has no payment account!");
    }
  } catch (err) {
    res.status(500).send("Failed to get account!");
  }
};

export const deleteAccount = async (req, res) => {
  const user = req.params.userId;
  const existingPayment = await Payment.findOne({ user: user });
  if (existingPayment) {
    try {
      const deleted = await stripe.accounts.del(existingPayment.customerId);
      await Payment.findByIdAndDelete(existingPayment.id);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send("User has no payment account!");
  }
};

export const createPayment = async (req, res) => {
  // Check if studysession and user exist.
  console.log(req.body);
  const studysessionId = new ObjectId(req.body.studysession);
  const studysession = await Studysession.findById(studysessionId);
  console.log("student id", req.body.studentId);
  const studentId = new ObjectId(req.body.studentId);
  const student = await User.findById(studentId);
  console.log("studentId", studentId);
  console.log("student", student);
  const tutorId = new ObjectId(studysession.tutoredBy);
  const tutor = await User.findById(tutorId);
  console.log("tutor", tutor);
  let amount = req.body.price;
  if (!studysession || !student) {
    console.log("studysession", studysession);
    res.status(404).send("Object reference not found!");
    return;
  }

  const product = await stripe.products.create({
    name: "test",
  });
  const productId = product.id;
  amount = amount * 100;
  const fee = amount * 0.1;
  const price = await stripe.prices.create({
    unit_amount: amount,
    currency: "eur",
    product: productId,
  });
  console.log("price", price);
  try {
    const existingAccount = await Payment.findOne({ user: tutorId });
    console.log("existingAccount", existingAccount);

    const stripeAccount = await stripe.accounts.retrieve(
      existingAccount.customerId
    );

    if (existingAccount && stripeAccount.charges_enabled == true) {
      // Create booking.
      const newBooking = new Booking({
        studysession: studysessionId,
        hours: req.body.hours,
        priceEuro: amount,
        createdAt: Date.now(),
        createdBy: studentId,
      });
      const savedBooking = await newBooking.save();
      const bookingId = savedBooking._id;
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        payment_intent_data: {
          application_fee_amount: fee,
          transfer_data: {
            destination: existingAccount.customerId,
          },
        },
        success_url: `http://localhost:3000/success/${bookingId}/${tutorId}`,
        cancel_url: `http://localhost:3000/success/${bookingId}`,
      });
      await Booking.findByIdAndUpdate(bookingId, {
        paymentSession: session.id,
      });
      console.log(bookingId);

      res.status(200).send(session);
    } else {
      res.status(400).send("User has no payment account!");
    }
  } catch (err) {
    res.status(400).send("Tutor doesn't have a payment account!");
    return;
  }
};
