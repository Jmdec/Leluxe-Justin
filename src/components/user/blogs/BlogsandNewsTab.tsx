'use client'

import React, { useState } from "react";
import { Tabs, Tab } from "@heroui/react";
import Blogs from "@/components/user/blogs/Blogs";
import News from "@/components/user/blogs/News";
import Videos from "@/components/user/blogs/Videos";
import Testimonials from "../home/Testimonial";

export default function BlogsandNewsTab() {
    const [selectedTab, setSelectedTab] = useState<string>("testimonials");

    return (
        <div className="flex flex-col items-center gap-4 mt-4">
            <Tabs 
                aria-label="Blogs and News Tabs" 
                color="warning" 
                radius="full"
                onSelectionChange={(key) => setSelectedTab(String(key))} 
            >
                <Tab key="testimonials" title="Testimonials" />
                <Tab key="blogs" title="Blogs" />
                <Tab key="news" title="News" />
                <Tab key="videos" title="Videos" />
            </Tabs>

            <div className="w-full">
                {selectedTab === "testimonials" && <Testimonials />}
                {selectedTab === "blogs" && <Blogs />}
                {selectedTab === "news" && <News />}
                {selectedTab === "videos" && <Videos />}
            </div>
        </div>
    );
}
