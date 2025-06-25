import React from 'react'
import HeroSection from '../modules/HeroSection'
import ShopSection from '../modules/ShopSection'
import GallerySection from '../modules/GallerySection'
import FooterSection from '../modules/FooterSection'
// import StatsSection from '../modules/StatsSection'
// import ReviewSection from '../modules/ReviewSection'

const page = () => {
  return (
    <div>
        <HeroSection />
        <GallerySection />
        <ShopSection />
        {/* <StatsSection /> */}
        {/* <ReviewSection /> */}
        <FooterSection />
    </div>
  )
}

export default page