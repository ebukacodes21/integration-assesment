This project is a small payment checkout system that integrates the Paystack API 

- I integrated the https://api.paystack.co/transaction/initialize endpoint to initialize and generate a reference number for the current transaction using my API secret key. I called the Paystack endpoint from the NextJS api route.

- Next, i returned the response from the backend (the reference number), and used it to complete the transaction by integrating the Paystack pop up API, which requires an authentication with the Paystack API public key.

To simulate this process, 

- clone the project
- run npm install for dependencies
- create a .env file and add your Paystack API secret and public keys