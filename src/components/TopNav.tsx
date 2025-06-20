import Link from 'next/link'
import React from 'react'


interface menuList{
    label:string,
    link:string,
    icon?:string | React.ReactNode,
    children?:React.ReactNode[]|string
}
const TopNav = () => {
    const menuList:menuList[]=[
        {
            label:'Help',
            link:'#'
        }
    ]
  return (
    <div className='bg-white p-2 flex justify-between'>

        {/* links */}
        <ul className='flex'>
            {
            menuList.map((item, index) => <Link href={item.link} key={index} className='text-black hover:text-black/75 transition-colors text-xs  top-0 font-bold font-poppins relative'>
                <span>{item.label}</span>
                
            </Link>)  
            }
        </ul>
    </div>
  )
}

export default TopNav