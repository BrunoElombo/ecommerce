"use client"

import { useAuthContext } from '@/context/AuthContext';
import { API_URL } from '@/constants/urls';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string | null;
  salePrice: number | null;
  quantity: number;
  description: string | null;
  shortDescription: string | null;
  createdAt: string;
  updatedAt: string;
}

interface CartItem {
  sku: string;
  qty: number;
  product: Product;
  variations: any[];
  createdAt: string;
}

const CheckoutPage = () => {
  const { token } = useAuthContext();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!token) {
      router.replace('/auth/login?redirect=/checkout');
      return;
    }
    const fetchData = async () => {
      try {
        // Fetch user email
        const meRes = await fetch(`${API_URL}/payments/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!meRes.ok) throw new Error('Failed to fetch user info');
        const meData = await meRes.json();
        setEmail(meData.email);

        // Fetch cart items
        const cartRes = await fetch(`${API_URL}/cart-items`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!cartRes.ok) throw new Error('Failed to fetch cart items');
        const cartData = await cartRes.json();
        setCartItems(cartData.data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, router]);

  const handleStripeCheckout = async () => {
    setProcessing(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/payments/checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cartItems, userEmail: email }),
      });
      const data = await res.json();
      if (data.error || !data.data?.url) {
        setError('Failed to create Stripe session');
        setProcessing(false);
        return;
      }
      window.location.href = data.data.url;
    } catch (err: any) {
      setError('Failed to start checkout');
      setProcessing(false);
    }
  };

  if (!token || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow text-black">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow text-black w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <div className="mb-4">
          <div className="font-medium">Email:</div>
          <div>{email}</div>
        </div>
        <div className="mb-4">
          <div className="font-medium">Items:</div>
          <ul className="list-disc ml-6">
            {cartItems.map((item) => (
              <li key={item.sku}>
                {item.product.name} x {item.qty}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleStripeCheckout}
          className="w-full bg-black text-white py-3 px-4 rounded-lg text-center font-medium hover:bg-gray-800 transition-colors"
          disabled={processing}
        >
          {processing ? 'Redirecting to Stripe...' : 'Pay with Card (Stripe)'}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage; 