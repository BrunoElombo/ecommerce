import React from 'react'
import HeroBanner from './modules/HeroBanner'
import ImpactReports from './modules/ImpactReports'
import NewsroomHighlights from './modules/NewsroomHighlights'
import Footer from './modules/Footer'

const page = () => {
  return (
    <div>
        <HeroBanner />
        <ImpactReports />
        <NewsroomHighlights />
        <Footer />
    </div>
  )
}

export default page