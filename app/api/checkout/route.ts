import axios from 'axios';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const body = await request.json();

    try {
        // prepare the data for Paystack API call
        const paymentParams = {
            email: body.email,
            amount: body.amount * 100,
        }

        // call Paystack API to initialize payment
        const paymentURL = "https://api.paystack.co/transaction/initialize";
        const res = await axios.post(paymentURL, paymentParams, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
        });

        // extract reference from Paystack response
        const reference = res.data.data.reference;

        // return the order response
        return NextResponse.json({
            reference,
        });
    } catch (error: any) {
        console.error(error);
        if (error.code === 'ECONNREFUSED') {
            return NextResponse.json({ error: 'Connection refused' }, { status: 500 });
        }

        return NextResponse.json({ error: error.response?.data }, { status: error.response?.status });
    }
}
