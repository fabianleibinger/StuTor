import axios from 'axios'
const BASE_URL ='/api'
const PAYMENT_URL = `${BASE_URL}/payment`



export const createAccountCall = async (userId) => {
  try {
  //const response = await axios.post(`${PAYMENT_URL}/onboardUser`)
  //return response.data
  //const userId = "6468f36705853e6071dfec63"
  //body is probably not defined correctly
  fetch(`${PAYMENT_URL}/account`, {
    method: 'POST',
    mode: 'no-cors', // 'cors' by default
    body: {
      user: userId
    },
  })
  .then(function(response) {
    console.log("onBoardUser response", response)
    return response.data;
  });
  } catch (error) {
    console.log(error)
  }
}

export const getPaymentInfo = async (userId) => {
  try {
    const response = await axios.get(`${PAYMENT_URL}/account/${userId}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const createPayment = async (userId, price) => {
  //console.log("in create payment api")
  try {
    console.log("here")
    const response = await axios.post(`${PAYMENT_URL}/createPayment`, {
      user: userId,
      price: price
    })
    console.log("URL in API", response.data.url)
    console.log("Response", response)
    console.log("test")
    return response.data.url
  } catch (err) {
    console.log(err)
  }
}



