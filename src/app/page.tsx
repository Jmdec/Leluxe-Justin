
import React from 'react';
import HeroSection from '@/components/user/Layout/HeroSection';
import Slider from '@/components/user/home/Slider';
import Faq from '@/components/user/home/Faq';
import Testimonial from '@/components/user/home/Testimonial';
import Steps from '@/components/user/home/Steps';
import TopServices from '@/components/user/home/TopServices';

function Home() {

  return (
    <div>
          <HeroSection
            title="Le Luxe Clinic"
            subtitle="Experience premium beauty treatments with our expert team."
            backgroundImage="/images/bg.jpg"
          />
          <Slider />
          <TopServices />
          <Steps />
          <Testimonial />
          {/* <Faq/> */}
    </div>
  );
}

export default Home;
