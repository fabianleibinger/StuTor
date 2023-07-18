import nodemailer from "nodemailer";

export const sendEmailToUser = async (toEmail, subject, content) => {
  try {
    // Create a nodemailer transporter using your email service configuration
    const transporter = nodemailer.createTransport({
      host: "postout.lrz.de", // SMTP host of your email service provider
      port: 587, // SMTP port of your email service provider
      secure: false, // Set to true if using a secure connection (e.g., SSL/TLS)
      auth: {
        user: "ge87wal", // Your email address
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    // Set up the email content
    const mailOptions = {
      from: "jason.wen@tum.de", // Sender email address
      to: toEmail, // Recipient email address
      subject: subject, // Subject of the email
      text: `Dear User,



We are sending you a temporary reset token for your STUTOR account. Please use the following token to reset your password in the user profile page as soon as possible.

Temporary Reset Token: 

${content}

Please ensure that you keep this token secure and do not share it with anyone else. 

If you did not initiate this password reset request, please disregard this email.

Thank you for using STUTOR.



Best regards,
Your STUTOR Team`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
