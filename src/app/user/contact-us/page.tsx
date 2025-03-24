import HeroSection from '@/components/user/about-us/HeroSection'
import ContactForm from '@/components/user/contact-us/ContactForm'
import React from 'react'

function page() {
    return (
        <div>
            <HeroSection
                title="Contact Us"
                subtitle="Get in touch with us for any inquiries or assistance."
                backgroundImage="/images/bg.jpg"
            />
            <ContactForm/>
        </div>
    )
}

export default page
