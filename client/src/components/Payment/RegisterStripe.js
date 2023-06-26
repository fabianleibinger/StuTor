import { createAccountCall, getPaymentInfo } from "../../api/Payment.js";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Button } from "@mui/material";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

const RegisterStripe = () => {
    const queryClient = useQueryClient();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let registerStripeIsPossible = false
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
      //console.log(paymentInfo)
      console.log(isLoading)
    if (isLoading) return "Loading..."
    if (error) 
    {   console.log(error.status)
        return "An error has occurred!"
    }
    if (data.length == 0) registerStripeIsPossible = true
    //console.log("paymentInfo", paymentInfo)
    if (data.chargesEnabled == false) return "You didn't set your stripe account up correctly!"
    //if (paymentInfo) return "You already have a stripe account!"

      const handleStripeAccount = async () => {
        try {
          await createAccount.mutateAsync();
          console.log("in handle stripe account")
        } catch (error) {
          console.log(error);
        }
      };

      // Redirect to Stripe checkout
  const handleRedirect = (url) => {
    //const path = new URL(url).pathname
    console.log("url", url)
    window.location.replace(url);
    //navigate(path);
  };
// add this again: registerStripeIsPossible && 
   return (
    <>
    {(
        <Button
        variant="contained"
        color="secondary"
        onClick={handleStripeAccount}
      >
        Set up Stripe payment
      </Button>
    )}
    </>
    
   );
}

export default RegisterStripe;