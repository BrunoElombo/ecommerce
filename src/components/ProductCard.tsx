"use client"

import { Product } from '@/types/Product'
import React, {useEffect, useState, Fragment} from 'react'
import Image from 'next/image'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import Modal from './dialog';
import { useForm } from 'react-hook-form'
import Link from 'next/link'

const ProductForm = ({ title, price, slug, closeModal }: { title: string; price: number; slug: string; closeModal: () => void }) => {
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState:{errors} } = useForm();

  const addToCart = async (data:any) => {
    
    setIsLoading(true)
    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/carts`
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productSlug: slug,
          quantity,
          size,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add to cart')
      }

      closeModal()
      // You might want to add a success notification here
    } catch (error) {
      console.error('Error adding to cart:', error)
      // You might want to add an error notification here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(addToCart)} className="p-6 text-black">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="text-lg font-bold mb-6">{price ? `$ ${price}` : "Free"}</p>
      
      <div className="space-y-4">
        <div className='flex items-center'>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              {...register('quantity', {required:'Please enter a quantity', min:1})}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors?.quantity && <span className="text-red-500 text-xs">{String(errors.quantity.message)}</span>}
          </div>

          <div>
            <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
              Size
            </label>
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              required
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select a size</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">Extra Large</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-black/80 transition-colors disabled:bg-gray-400"
        >
          {isLoading ? 'Adding to cart...' : 'Add to Cart'}
        </button>
      </div>
    </form>
  )
}

interface ProductCardProps {
  name: string;
  image: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
}

const ProductCard = ({ name, image, slug, description, price, stock }: ProductCardProps) => {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <Link href={`/shop/${slug}`}>
      <div className="group relative h-[400px] bg-white  md:w-[300px] overflow-hidden transition-transform duration-300">
        {/* <div className='absolute'>
          <HeartIcon className='text-white h-4 z-10'/>
        </div> */}
        {/* Image Container */}
        <div className="relative w-full h-75 bg-gray-100">
          {image ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <Image
                src={'/jk-wears-logo-black.svg'}
                alt={name}
                fill
                className="opacity-25"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          {stock === 0 && (
            <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg">
              Out of Stock
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className='flex items-center justify-between'>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 capitalize">{name}</h3>
            {/* <div>
              <HeartIcon className='h-4 text-black'/>
            </div> */}
          </div>
          {/* <p className="text-sm font- text-gray-400 mb-3 line-clamp-2">{description}</p> */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-black">{price ? `$ ${price}` : "Free"}</span>
            <span className={`text-sm px-4 p- rounded-full  ${stock === null ? " text-green-500" : "text-red-500"}`}>
              {stock === null ? "In stock" : "Out of stock"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}


export default ProductCard