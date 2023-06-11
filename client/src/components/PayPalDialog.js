import React from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, Typography } from '@mui/material';
import { useQueryClient } from 'react-query';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const PayPalDialog = ({ open, onClose, priceEuro }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>PayPal</DialogTitle>
            <DialogContent>
                <PayPalScriptProvider options={{ "client-id": "AdneQTEzxtUMB51tIffv4YLnIqT_Tlcpvdk856Q-plc0y4YP4LyjJNW2AucVSzEkTryUfdRwDu_VUlqi" }}>
                    <PayPalButtons
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: "1.99",
                                        },
                                        payee: {
                                            email_address: "sb-hnxcd26269184@personal.example.com", // Specify the recipient's PayPal account email
                                          },
                                    },
                                ],
                            });
                        }
                        }
                        onApprove={(data, actions) => {
                            return actions.order.capture().then((details) => {
                                alert("Transaction completed by " + details.payer.name.given_name);
                            });
                        }
                        }
                    />
                </PayPalScriptProvider>
            </DialogContent>
        </Dialog>
    );
};

export default PayPalDialog;