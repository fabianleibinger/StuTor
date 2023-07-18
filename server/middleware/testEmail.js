import nodemailer from "nodemailer";

// Create a nodemailer transporter using your email service configuration
const transporter = nodemailer.createTransport({
  host: "postout.lrz.de", // SMTP host of your email service provider
  port: 587, // SMTP port of your email service provider
  secure: false, // Set to true if using a secure connection (e.g., SSL/TLS)
  auth: {
    user: "ge87wal", // Your email address
    pass: "", // Your email password
  },
});

const mailOptions = {
  from: "your-email-username", // Replace with your email address
  to: "jasonwendavidson@gmail.com", // Replace with the recipient's email address
  subject: "Test Email",
  text: "This is a test email sent using Nodemailer.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log("Error sending email:", error);
  } else {
    console.log("Email sent:", info.response);
  }
});
