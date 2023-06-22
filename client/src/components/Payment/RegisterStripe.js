import { createAccountCall, getPaymentInfo } from "../../api/Payment.js";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Button } from "@mui/material";

const RegisterStripe = () => {
    const queryClient = useQueryClient();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const RegisterStripeIsPossible = false
    const {
        isLoading: isloading,
        error: error,
        data: paymentInfo,
        refetch,
      } = useQuery(["payment"], () =>
        getPaymentInfo(currentUser._id)
      );

      const createAccount = useMutation(() => createAccountCall(currentUser._id), {
        onSuccess: () => {
          queryClient.invalidateQueries("payment");
        },
        onError: (error) => {
          console.log(error);
        },
      });
      console.log(paymentInfo)

    if (isloading) return "Loading..."
    if (error) return "An error has occurred!"
    if (paymentInfo.chargesEnabled == false) return "You didn't set your stripe account up correctly!"
    if (paymentInfo) return "You already have a stripe account!"

      const handleStripeAccount = async () => {
        try {
          await createAccount.mutateAsync();
        } catch (error) {
          console.log(error);
        }
      };

   return (
    <Button
          variant="contained"
          color="secondary"
          onClick={handleStripeAccount}
        >
          Set up Stripe payment
        </Button>
   );
}

export default RegisterStripe;