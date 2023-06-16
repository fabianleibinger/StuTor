import axios from 'axios'
const BASE_URL ='/api'
const PAYMENT_URL = `${BASE_URL}/payment`

export const createAccountCall = async () => {
  try {
  //const response = await axios.post(`${PAYMENT_URL}/onboardUser`)
  //return response.data
  fetch(`${PAYMENT_URL}/onboardUser`, {
    method: 'POST',
    mode: 'no-cors' // 'cors' by default
  })
  .then(function(response) {
    console.log("onBoardUser response", response)
    return response.data;
  });
  } catch (error) {
    console.log(error)
  }
}

