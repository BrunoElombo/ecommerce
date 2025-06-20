import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-end py-16 md:py-0 md:items-center">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay (optional for better text readability) */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Text Content */}
      <div className="relative z-20 flex gap-4 flex-col p-6 md:px-50">
        <h2 className='text-6xl md:text-9xl'>JK wears</h2>
        <p className='text-lg font-light '>Elevate fitness with ethical, high-performance, fashion-forward essentials.</p>
        <div>
            <Link href="/shop" className='border hover:bg-transparent hover:text-white w-[200px] p-2 px-6 rounded-full cursor-pointer transition-all text-black bg-white flex items-center gap-2 justify-center'>
              <ShoppingCartIcon className='h-5 w-5'/>
              <span>Go to shop</span>
            </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection