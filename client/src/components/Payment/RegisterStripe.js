import {
  createAccountCall,
  getPaymentInfo,
  deleteAccountCall,
  updateAccountCall,
} from "../../api/Payment.js";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Button, Alert, Dialog } from "@mui/material";
import { useUserContext } from "../../context/UserProvider.js";
import React, { useState } from "react";
import { DialogTitle, DialogActions } from "@mui/material";

const RegisterStripe = () => {
  const queryClient = useQueryClient();
  const { user } = useUserContext();
  let registerStripeIsPossible = false;
  let updateAccountIsPossible = false;
  const [showDialog, setShowDialog] = useState(false);

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCancel = () => {
    setShowDialog(false);
    refetch();
  };
  const {
    isLoading: isLoading,
    error: error,
    data: data,
    refetch,
  } = useQuery(["payment"], () => getPaymentInfo(user._id));

  const createAccount = useMutation(() => createAccountCall(user._id), {
    onSuccess: (url) => {
      console.log("in create account mutation and url is", url);
      handleRedirect(url);
      queryClient.invalidateQueries("payment");
    },
    onError: (error) => {
      console.log("use Mutation", error);
    },
  });

  const updateAccount = useMutation(() => updateAccountCall(user._id), {
    onSuccess: (url) => {
      console.log("in update account mutation and url is", url);
      handleRedirect(url);
      queryClient.invalidateQueries("payment");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteAccount = useMutation(() => deleteAccountCall(user._id), {
    onSuccess: (url) => {
      registerStripeIsPossible = true;
      queryClient.invalidateQueries("payment");
      setShowDialog(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  if (isLoading) return "Loading...";
  if (error) {
    console.log(error.status);
    return "An error has occurred!";
  }
  if (data.length == 0) registerStripeIsPossible = true;
  if (data.charges_enabled == false) {
    updateAccountIsPossible = true;
  }
  //if (paymentInfo) return "You already have a stripe account!"

  const handleStripeAccount = async () => {
    try {
      await createAccount.mutateAsync();
      console.log("in handle stripe account");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStripeAccount = async () => {
    try {
      await updateAccount.mutateAsync();
      console.log("in handle update stripe account");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteStripeAccount = async () => {
    try {
      await deleteAccount.mutateAsync();
      console.log("in handle delete tripe account");
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  // Redirect to Stripe oboarding
  const handleRedirect = (url) => {
    //const path = new URL(url).pathname
    window.location.replace(url);
    //navigate(path);
  };

  return (
    <>
      {registerStripeIsPossible && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleStripeAccount}
        >
          Set up Stripe payment
        </Button>
      )}
      {!registerStripeIsPossible && !updateAccountIsPossible && (
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Delete Stripe account
        </Button>
      )}
      {updateAccountIsPossible && (
        <>
          <Alert severity="warning">
            Currently you can not receive payments over your stripe account -
            update it!
          </Alert>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateStripeAccount}
          >
            Update Stripe account
          </Button>
        </>
      )}
      <Dialog open={showDialog} onClose={handleCancel}>
        <DialogTitle>
          Do you really want to delete your stripe account?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteStripeAccount} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RegisterStripe;
