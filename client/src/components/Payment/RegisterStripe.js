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

  // Determine if the user can register, update or delete his stripe account
  let registerStripeIsPossible = false;
  let updateAccountIsPossible = false;

  // States for the delete dialog
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

  // Redirect to Stripe onboarding page
  const handleRedirect = (url) => {
    window.location.replace(url);
  };

  const createAccount = useMutation(() => createAccountCall(user._id), {
    onSuccess: (url) => {
      handleRedirect(url);
      queryClient.invalidateQueries("payment");
    },
    onError: (error) => {
      console.log("use Mutation", error);
    },
  });

  const updateAccount = useMutation(() => updateAccountCall(user._id), {
    onSuccess: (url) => {
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

  // There is no stripe account yet
  if (data.length == 0) registerStripeIsPossible = true;

  // The stripe account is nt set up correctly
  if (data.charges_enabled == false) {
    updateAccountIsPossible = true;
  }

  const handleStripeAccount = async () => {
    try {
      await createAccount.mutateAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStripeAccount = async () => {
    try {
      await updateAccount.mutateAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteStripeAccount = async () => {
    try {
      await deleteAccount.mutateAsync();
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    {/* Case that there is no stripe account set up yet */}
      {registerStripeIsPossible && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleStripeAccount}
        >
          Set up Stripe payment
        </Button>
      )}
      {/* Case that the stripe account is set up correctly and can be deleted */}
      {!registerStripeIsPossible && !updateAccountIsPossible && (
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Delete Stripe account
        </Button>
      )}
      {/* Case that the stripe account is not set up correctly and should be updated */}
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
      { /* Dialog for deleting stripe account */ } 
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
