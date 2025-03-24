import React from 'react'
import Image from 'next/image'
import "@/app/globals.css"; 
 

function Slider() {
  return (
    <section className="bg-white/50 backdrop-blur-lg pt-2 pb-2">
      <div className="slider-container group">
        <div className="slider-content">
          {/* Original Set */}
          <Image className="mx-16 h-30" src="/images/slider/Slider1.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider2.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider3.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider4.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider5.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider6.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider7.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider8.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider9.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider10.png" width={150} height={200} alt="Le Luxe" />

          {/* Duplicate Set for Seamless Loop */}
          <Image className="mx-16 h-30" src="/images/slider/Slider1.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider2.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider3.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider4.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider5.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider6.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider7.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider8.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider9.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider10.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider1.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider2.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider3.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider4.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider5.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider6.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider7.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider8.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider9.png" width={150} height={200} alt="Le Luxe" />
          <Image className="mx-16 h-30" src="/images/slider/Slider10.png" width={150} height={200} alt="Le Luxe" />
        </div>
      </div>
    </section>
  );
}

export default Slider;