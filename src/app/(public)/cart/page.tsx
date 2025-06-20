import { ShoppingBagIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { ShoppingBasket, ShoppingBasketIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='h-screen w-full mt-18 flex items-center justify-center'>
        <div className='text-4xl flex flex-col items-center gap-4'>
            <p className=''>No item found</p>
            <Link href="/shop" className='border hover:bg-transparent hover:text-white w-[200px] p-2 px-6 rounded-full cursor-pointer transition-all text-black bg-white flex items-center gap-2 justify-center'>
              <ShoppingCartIcon className='h-5 w-5'/>
              <span className='text-sm'>Go to shop</span>
            </Link>
        </div>
    </div>
  )
}

export default page