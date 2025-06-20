import React from 'react'
import { Users, ShoppingBag, Globe } from 'lucide-react'

const StatsSection = () => {
  return (
    <div className='w-full py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {/* Buyers Stat */}
          <div className='shadow-lg p-6 flex items-center space-x-4 text-white'>
            <div className='p-3 rounded-full'>
              <Users className='w-8 h-8' />
            </div>
            <div>
              <p className='text-sm font-medium'>Total Buyers</p>
              <p className='text-5xl font-bold '>10,000+</p>
            </div>
          </div>

          {/* Products Bought Stat */}
          <div className='text-white shadow-lg p-6 flex items-center space-x-4'>
            <div className='p-3 rounded-full'>
              <ShoppingBag className='w-8 h-8' />
            </div>
            <div>
              <p className='text-sm font-medium'>Products Sold</p>
              <p className='text-5xl font-bold'>50,000+</p>
            </div>
          </div>

          {/* Countries Stat */}
          <div className='bg-black text-white shadow-lg p-6 flex items-center space-x-4'>
            <div className='p-3 rounded-full'>
              <Globe className='h-28 w-28 text-white' />
            </div>
            <div>
              <p className='text-sm font-medium '>Countries Reached</p>
              <p className='text-5xl font-bold'>3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsSection