import HeroSection from '@/components/user/about-us/HeroSection'
import ServicesOffer from '@/components/user/service-offer/ServicesOffer'
import React from 'react'

function page() {
    return (
        <div>
            <HeroSection
                title="Our Services"
                subtitle="Discover the wide range of beauty treatments designed to enhance your natural beauty."
                backgroundImage="/images/bg.jpg"
            />
            <ServicesOffer />
        </div>
    )
}

export default page
