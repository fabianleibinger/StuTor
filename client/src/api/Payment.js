import axios from 'axios'
const BASE_URL ='/api'
const PAYMENT_URL = `${BASE_URL}/payment`



export const createAccountCall = async (userId) => {
  
  const response = await axios.post(`${PAYMENT_URL}/createAccount/${userId}`)
  return response.data.url
}

export const getPaymentInfo = async (userId) => {
  try {
  console.log("in get payment info api")
    const response = await axios.get(`${PAYMENT_URL}/account/${userId}`)
    console.log("response", response)
    
    return response.data
  } catch (error) {
    if (error.response.status == 400) {
      console.log("User has no payment account!")
      return []
    }
    console.log("in catch error")
    throw error
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

export const deleteAccountCall = async (userId) => {
  const response = await axios.delete(`${PAYMENT_URL}/deleteAccount`, userId)
  return response.data
}



