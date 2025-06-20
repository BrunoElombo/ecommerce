import Image from 'next/image'
import React from 'react'

const layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='h-screen w-full flex items-center justify-center flex-col'>
        <div className='w-full flex items-center justify-center my-6 gap-4'>
            <Image alt='jk-wears-logo' width={50} height={50} src="/jk-wears-logo-white.svg"/>
            <h4 className='font-bold text-4xl'>Believe it</h4>
        </div>
        {children}
    </div>
  )
}

export default layout