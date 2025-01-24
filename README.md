This project is a small payment checkout system that integrates the Paystack API 

- I integrated the https://api.paystack.co/transaction/initialize endpoint to initialize and generate a reference number for the current transaction using my API secret key. I called the Paystack endpoint on the client side.

- Next, i returned the response from the backend (the reference number), and used it to complete the transaction by integrating the Paystack pop up API, which requires an authentication with the Paystack API public key.

To simulate this process, 

- clone the project
- run npm install for dependencies
- create a .env file and add your Paystack API secret and public keys


Github pages currently do not support environment variables so the response from paystack API would be 401 - unauthorized (I DID NOT UPLOAD MY .ENV FILE WHICH HOLDS MY API SECRET AND PUBLIC KEYS). 
