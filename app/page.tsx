"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Main = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [PaystackPop, setPaystackPop] = useState<any>(null);
  const [email, setEmail] = useState<string>("");

  let amount = 850000

  const onCheckout = async () => {
    if (!PaystackPop) return;
    setIsLoading(true)
    try {
      const res = await axios.post('/api/checkout', {
        email,
        amount
      });

      const popup = new PaystackPop();
      popup.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        email: email, 
        amount: amount * 100,
        reference: res.data.reference,
        onSuccess: async (tx: any) => {
          console.log(tx)
          alert(`payment successful: ${tx.message}`)
          setIsLoading(false)
          amount = 0
          setEmail("")
        },
        onCancel: () => {
          alert("cancelled") 
          amount = 0
          setEmail("")
          setIsLoading(false)
        },
      });
    } catch (error: any) {
      console.error(error);
      setEmail("")
      setIsLoading(false)
    }
  };

  useEffect(() => {
    setIsMounted(true);

    import("@paystack/inline-js").then((module) => {
      setPaystackPop(() => module.default);
    });
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Assessment</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between space-x-2">
          <label
            htmlFor="email"
            className="text-base font-medium text-gray-900"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-1 mt-1 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter your email"
          />
        </div>


        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          Total Amount: ₦{amount} 
        </div>
      </div>

      <button
        onClick={onCheckout}
        disabled={loading || !email}
        className="w-full mt-6"
      >
         {loading ? "Checking out..." : "Checkout"}
      </button>
    </div>
  );
};

export default Main;
