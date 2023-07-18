import React from "react";
import { DialogTitle, DialogContent, DialogContentText } from "@mui/material";

/**
 * The StuTor Customer Support Dialog content.
 */
function ContactSupportDialog() {
  return (
    <div>
      <DialogTitle>{"Contact our customer support"}</DialogTitle>
      <DialogContent>
        <img
          src="https://res.cloudinary.com/daefab1lj/image/upload/v1688829580/anhz4srs4pgrwr5woyav.png"
          alt="Customer Support"
          style={{ maxWidth: "550px", maxHeight: "550px" }}
        />
        <br />
        <DialogContentText id="alert-dialog-slide-description">
          If you have any questions, concerns or emergencies please don't
          hesitate to contact our customer support via email.
        </DialogContentText>
        <DialogContentText id="alert-dialog-slide-description">
          We offer 24h support and will get back to you as soon as possible.
        </DialogContentText>
        <br />
        <DialogContentText id="alert-dialog-slide-description">
          Email:
        </DialogContentText>
        <DialogContentText id="alert-dialog-slide-description">
          support@stutor.com
        </DialogContentText>
      </DialogContent>
    </div>
  );
}

export default ContactSupportDialog;
