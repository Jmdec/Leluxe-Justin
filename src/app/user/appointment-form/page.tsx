"use client"

import HeroSection from '@/components/user/about-us/HeroSection';
import AppointmentForm from '@/components/user/appointment/AppointmentForm';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppointmentPage() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const router = useRouter();

    // useEffect(() => {
    //     const params = new URLSearchParams(window.location.search);
    //     const userId = params.get('userId') || sessionStorage.getItem('userId');

    //     if (!userId) {
    //         toast.error("You must be logged in to book an appointment.");
    //         setTimeout(() => {
    //             router.push('/auth/login');
    //         }, 3000);
    //     } else {
    //         sessionStorage.setItem('userId', userId);
    //         setIsLoggedIn(true);
    //     }
    // }, []);

    return (
        <div>
            <HeroSection
                title="Book an Appointment"
                subtitle="Schedule your appointment with us for personalized services."
                backgroundImage="/images/bg.jpg"
            />
            <div className="container mx-auto px-4 py-8">

                <AppointmentForm />

            </div>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
}

export default AppointmentPage;
