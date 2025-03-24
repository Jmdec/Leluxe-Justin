'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import Navbar from "@/components/user/Layout/NavBar";
import FloatingSocial from "@/components/user/Layout/FloatingSocial";
import Footer from "@/components/user/Layout/Footer";
import clsx from "clsx";
import LoadingState from '@/components/LoadingState';
// 
export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer); 
  }, []);

  if (loading) {
    return <LoadingState />;
  }


  const isRestrictedPage = ["/admin","/auth" ,"/user/privacy-policy","/authorized-user","/user/terms-and-conditions"].some((route) => pathname.startsWith(route));

  return (
    <div className="relative flex flex-col h-screen">
      {!isRestrictedPage && <Navbar />}
      <main className={clsx("flex-1 h-auto")}>{children}</main>
      {!isRestrictedPage && (
        <>
          <FloatingSocial />
          <Footer />
        </>
      )}
    </div>
  );
}
