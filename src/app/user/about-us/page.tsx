import HeroSection from '@/components/user/about-us/HeroSection'
import Introduction from '@/components/user/about-us/Introduction'
import OurTeam from '@/components/user/about-us/OurTeam'
import Vmgo from '@/components/user/about-us/Vmgo'
import WhyChooseUs from '@/components/user/about-us/WhyChooseUs'
import ContactForm from '@/components/user/contact-us/ContactForm'
import React from 'react'

function page() {
    return (
        <div>
            <HeroSection
                title="About Le Luxe Clinic"
                subtitle="Discover our commitment to excellence in beauty and wellness."
                backgroundImage="/images/bg.jpg"
            />
            <Introduction/>
            <Vmgo/>
            <WhyChooseUs/>
            <OurTeam/>
            <ContactForm/>
        </div>
    )
}

export default page
