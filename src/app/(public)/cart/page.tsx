"use client"

import { API_URL } from '@/constants/urls'
import { ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

interface ProductVariation {
  name: string
  value: string
  type: 'SIZE' | 'COLOR' | 'COUNTRY'
}

interface Product {
  id: string
  name: string
  slug: string
  price: number
  image: string | null
  salePrice: number | null
  quantity: number
  description: string | null
  shortDescription: string | null
  createdAt: string
  updatedAt: string
}

interface CartItem {
  sku: string
  qty: number
  product: Product
  variations: ProductVariation[]
  createdAt: string
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    fetchCartItems()
  }, [])

  const fetchCartItems = async () => {
    try {
      let url = API_URL + "/cart-items"
      let response = await fetch(url)
      let result = await response.json()

      if (result.error) {
        toast.error("Failed to fetch cart items")
        return
      }
      setCartItems(result.data)
    } catch (error) {
      console.error(error)
      toast.error("Error fetching cart items")
    }
  }

  const handleDeleteItem = async (sku: string) => {
    try {
      setIsLoading(true)
      const url = `${API_URL}/cart-items/${sku}`
      const response = await fetch(url, {
        method: 'DELETE',
      })
      const result = await response.json()

      if (result.error) {
        toast.error("Failed to delete item")
        return
      }

      toast.success("Item removed from cart")
      fetchCartItems() // Refresh cart items
    } catch (error) {
      console.error(error)
      toast.error("Error deleting item")
    } finally {
      setIsLoading(false)
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product.salePrice || item.product.price
      return total + (price * item.qty)
    }, 0)
  }

  const handleProceedToCheckout = () => {
    if (!token) {
      router.push('/auth/login?redirect=/checkout');
    } else {
      router.push('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className='min-h-screen w-full mt-18 flex items-center justify-center'>
        <div className='text-4xl flex flex-col items-center gap-4'>
          <p className=''>Your cart is empty</p>
          <Link href="/shop" className='border hover:bg-transparent hover:text-white w-[200px] p-2 px-6 rounded-full cursor-pointer transition-all text-black bg-white flex items-center gap-2 justify-center'>
            <ShoppingCartIcon className='h-5 w-5' />
            <span className='text-sm'>Go to shop</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className='w-full h-[40vh] bg-black flex justify-center items-center'>
        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.sku} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-200 rounded-md relative overflow-hidden">
                    {item.product.image ? (
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">
                      {item.variations.map((v, i) => (
                        <span key={i}>
                          {v.type}: {v.name }
                          {i < item.variations.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div>
                        <span className="text-gray-900 font-medium">
                          ${(item.product.salePrice || item.product.price).toFixed(2)}
                        </span>
                        {item.product.salePrice && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ${item.product.price.toFixed(2)}
                          </span>
                        )}
                        <span className="ml-2 text-sm text-gray-500">
                          × {item.qty}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteItem(item.sku)}
                        disabled={isLoading}
                        className="text-red-600 hover:text-red-800 disabled:opacity-50"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-gray-900">Total</span>
                    <span className="text-lg font-medium text-gray-900">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-black text-white py-3 px-4 rounded-lg text-center font-medium hover:bg-gray-800 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage