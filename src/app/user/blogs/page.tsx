
import HeroSection from '@/components/user/about-us/HeroSection'
import BlogsandNewsTab from '@/components/user/blogs/BlogsandNewsTab'
import ContactForm from '@/components/user/contact-us/ContactForm'


import React from 'react'

function page() {
    return (
        <section>
            <HeroSection
                title="News And Blogs"
                subtitle="Stay updated with the latest news and insights."
                backgroundImage="/images/bg.jpg"
            />
            
            <BlogsandNewsTab/>
            <ContactForm/>
        </section>
    )
}

export default page
