"use client"
import { API_URL } from '@/constants/urls'
import { useAuthContext } from '@/context/AuthContext'
import { ShoppingBagIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const HeaderSection = () => {

  // Hooks
  const {token} = useAuthContext()


  // States
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const [cartSize, setCartSize] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 100)
    }

    const fetchCartItems =async()=>{
      try {
        let url:string=`${API_URL}/cart-items`;
        let options ={
          headers:{
            'authorization':'Bearer '+"token"
          }
        }
        let response = await fetch(url, options)
        let result = await response.json();
        if(result.error){
          return;
        }
        let cartSize = result.data.length;
        setCartSize(cartSize);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCartItems();
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  return (
    <header className={`top-0 left-0 right-0 z-50 transition-all duration-300 font-poppins ${
      isScrolled ? 'bg-white shadow-md sticky' : 'bg-transparent absolute'
    }`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link href="/" className={`text-2xl font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
              {isScrolled ?
              <Image src={'/jk-wears-logo-black.svg'} alt='jk wears logo' width={30} height={30}/> :
              <Image src={'/jk-wears-logo-white.svg'} alt='jk wears logo' width={30} height={30}/>
              }
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex space-x-8'>
            <Link href='/' className={`${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'} px-3 py-2 text-sm font-medium`}>
              Home
            </Link>
            <Link href='/shop' className={`${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'} px-3 py-2 text-sm font-medium`}>
              Shop
            </Link>
            <Link href='/gallery' className={`${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'} px-3 py-2 text-sm font-medium`}>
              Gallery
            </Link>
            <Link href='/about' className={`${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'} px-3 py-2 text-sm font-medium`}>
              About
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className='hidden md:flex items-center space-x-4'>
            <button
              onClick={toggleSearch}
              className={isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'}
            >
              <MagnifyingGlassIcon className='h-6 w-6' />
            </button>
            <Link href="/cart" className={`${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'} relative`}>
              <ShoppingBagIcon className='h-6 w-6' />
              <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                {cartSize}
              </span>
            </Link>
            <Link href={token ? "/profile" : "/auth/login"} className={`${isScrolled ? 'text-black hover:text-gray-900' : 'text-white hover:text-gray-200'}`}>
              {token ? <UserIcon className='h-6 w-6' /> : <span className='mx-2'>Login</span>}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden flex items-center space-x-4'>
            <button
              onClick={toggleSearch}
              className={isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'}
            >
              <MagnifyingGlassIcon className='h-6 w-6' />
            </button>
            <Link href="/cart" className={`${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'} relative`}>
              <ShoppingBagIcon className='h-6 w-6' />
              <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                {cartSize}
              </span>
            </Link>
            <Link href={token ? "/profile" : "/auth/login"} className={`${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'}`}>
              {token ? <UserIcon className='h-6 w-6' /> : <span className='mx-2'>Login</span>}  
            </Link>
            <button
              onClick={toggleMenu}
              className={isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'}
            >
              {isMenuOpen ? (
                <XMarkIcon className='h-6 w-6' />
              ) : (
                <Bars3Icon className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-white'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            <Link href='/' className='block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50'>
              Home
            </Link>
            <Link href='/shop' className='block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50'>
              Shop
            </Link>
            <Link href='/gallery' className='block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50'>
              Gallery
            </Link>
            <Link href='/about' className='block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50'>
              About
            </Link>
          </div>
        </div>
      )}

      {/* Search overlay */}
      {isSearchOpen && (
        <div className='fixed inset-0 bg-white z-50'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
            <div className='flex items-center justify-between'>
              <div className='flex-1 max-w-2xl mx-auto'>
                <div className='relative'>
                  <input
                    type='text'
                    placeholder='Search products...'
                    className='w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                  <button className='absolute right-3 top-2.5 text-gray-400 hover:text-gray-600'>
                    <MagnifyingGlassIcon className='h-5 w-5' />
                  </button>
                </div>
              </div>
              <button
                onClick={toggleSearch}
                className='ml-4 text-gray-600 hover:text-gray-900'
              >
                <XMarkIcon className='h-6 w-6' />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default HeaderSection