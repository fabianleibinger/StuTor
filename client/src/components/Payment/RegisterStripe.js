import { createAccountCall, getPaymentInfo, deleteAccountCall, updateAccountCall } from "../../api/Payment.js";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Button, Alert } from "@mui/material";

const RegisterStripe = () => {
    const queryClient = useQueryClient();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let registerStripeIsPossible = false
    let updateAccountIsPossible = false
    const {
        isLoading: isLoading,
        error: error,
        data: data,
        refetch,
      } = useQuery(["payment"], () =>
        getPaymentInfo(currentUser._id)
      );

      const createAccount = useMutation(() => createAccountCall(currentUser._id), {
        onSuccess: (url) => {
            console.log("in create account mutation and url is", url)
            handleRedirect(url);
          queryClient.invalidateQueries("payment");
        },
        onError: (error) => {
          console.log("use Mutation", error);
        },
      });

      const updateAccount = useMutation(() => updateAccountCall(currentUser._id), {
        onSuccess: (url) => {
            console.log("in update account mutation and url is", url)
            handleRedirect(url);
            queryClient.invalidateQueries("payment");
        },
        onError: (error) => {
            console.log(error);
        },
        });


      const deleteAccount = useMutation(() => deleteAccountCall(currentUser._id), {
        onSuccess: (url) => {
            registerStripeIsPossible = true
            queryClient.invalidateQueries("payment");
        },
        onError: (error) => {
            console.log(error);
        },
        });
      //console.log(paymentInfo)
      console.log(isLoading)
    if (isLoading) return "Loading..."
    if (error) 
    {   console.log(error.status)
        return "An error has occurred!"
    }
    if (data.length == 0) registerStripeIsPossible = true
    //console.log("paymentInfo", paymentInfo)
    console.log(data)
    console.log(data.charges_enabled)
    if (data.charges_enabled == false) {
        updateAccountIsPossible = true
    }
    //if (paymentInfo) return "You already have a stripe account!"

      const handleStripeAccount = async () => {
        try {
          await createAccount.mutateAsync();
          console.log("in handle stripe account")
        } catch (error) {
          console.log(error);
        }
      };

      const handleUpdateStripeAccount = async () => {
        try {
            await updateAccount.mutateAsync();
            console.log("in handle update stripe account")
        } catch (error) {
            console.log(error);
        }
        };

      const handleDeleteStripeAccount = async () => {
        try {
          await deleteAccount.mutateAsync();
          console.log("in handle delete tripe account")
        } catch (error) {
          console.log(error);
        }
      };

      // Redirect to Stripe oboarding
  const handleRedirect = (url) => {
    //const path = new URL(url).pathname
    console.log("url", url)
    window.location.replace(url);
    //navigate(path);
  };
  console.log("before return")
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
    {!registerStripeIsPossible && !updateAccountIsPossible &&(
        <Button
        variant="contained"
        color="primary"
        onClick={handleDeleteStripeAccount}
      >
        Delete Stripe account
      </Button>
    )}
    {updateAccount && (
        <>
        <Alert severity="warning">Currently you can not receive payments over your stripe account - update it!</Alert>
        <Button
        variant="contained"
        color="primary"
        onClick={handleUpdateStripeAccount}
        >
        Update Stripe account
        </Button>
        </>
    )}

    </>
    
   );
}

export default RegisterStripe;