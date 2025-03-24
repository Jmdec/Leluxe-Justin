import {
    Squares2X2Icon, XMarkIcon, NewspaperIcon, DocumentTextIcon, UsersIcon, StarIcon,
    BriefcaseIcon, CalendarIcon, ChatBubbleLeftRightIcon,    
    VideoCameraIcon
} from '@heroicons/react/16/solid'
import { Card } from '@heroui/card'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};


const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const pathname = usePathname();

    const getActiveClass = (path: string) => {
        return pathname === path ? "bg-amber-200 text-white" : "text-white";
    };
    return (
        <div>
            <Card radius='none' shadow='md'
                className="w-64 min-h-screen h-screen bg-gradient-to-b from-white to-white
             flex flex-col overflow-y-auto fixed top-0 left-0 z-40
             transition-transform transform 
             lg:relative lg:z-auto lg:h-auto"
            >
                <div className="flex items-center justify-center mt-10 mb-3">
                    <div className="flex flex-col items-center text-center font-thin ">
                        <Image
                            src="/images/logonav.png"
                            alt="Admin Panel Logo"
                            width={200}
                            height={200}
                            className="mb-2"
                        />
                    </div>
                    {isOpen && (
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-black"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    )}
                </div>
                <nav className="flex-1 p-4 text-start items-center">
                    <ul className="space-y-4">
                        <li className={`p-2 flex items-center space-x-2 hover:bg-amber-100 rounded-md ${getActiveClass("/admin/dashboard")}`}>
                            <Squares2X2Icon className="h-5 w-5 text-black" />
                            <Link href="/admin/dashboard" className="text-black">
                                Dashboard
                            </Link>
                        </li>
                        <li className={`p-2 flex items-center space-x-2 hover:bg-amber-100 rounded-md ${getActiveClass("/admin/appointments")}`}>
                            <CalendarIcon className="h-5 w-5 text-black" />
                            <Link href="/admin/appointments" className="text-black">
                                Appointments
                            </Link>
                        </li>
                        <li className={`p-2 flex items-center space-x-2 hover:bg-amber-100 rounded-md ${getActiveClass("/admin/services")}`}>
                            <BriefcaseIcon className="h-5 w-5 text-black" />
                            <Link href="/admin/services" className="text-black">
                                Services
                            </Link>
                        </li>
                        <li className={`p-2 flex items-center space-x-2 hover:bg-amber-100 rounded-md ${getActiveClass("/admin/testimonials")}`}>
                            <StarIcon className="h-5 w-5 text-black" />
                            <Link href="/admin/testimonials" className="text-black">
                                Testimonials
                            </Link>
                        </li>
                        <li className={`p-2 flex items-center space-x-2 hover:bg-amber-100 rounded-md ${getActiveClass("/admin/our-team")}`}>
                            <UsersIcon className="h-5 w-5 text-black" />
                            <Link href="/admin/our-team" className="text-black">
                                Our Team
                            </Link>
                        </li>
                        <li className={`p-2 flex items-center space-x-2 hover:bg-amber-100 rounded-md ${getActiveClass("/admin/news")}`}>
                            <NewspaperIcon className="h-5 w-5 text-black" />
                            <Link href="/admin/news" className="text-black">
                                News
                            </Link>
                        </li>
                        <li className={`p-2 flex items-center space-x-2 hover:bg-amber-100 rounded-md ${getActiveClass("/admin/blogs")}`}>
                            <DocumentTextIcon className="h-5 w-5 text-black" />
                            <Link href="/admin/blogs" className="text-black">
                                Blogs
                            </Link>
                        </li>
                        <li className={`p-2 flex items-center space-x-2 hover:bg-amber-100 rounded-md ${getActiveClass("/admin/videos")}`}>
                            <VideoCameraIcon className="h-5 w-5 text-black" />
                            <Link href="/admin/videos" className="text-black">
                                Videos
                            </Link>
                        </li>
                        <li className={`p-2 flex items-center space-x-2 hover:bg-amber-100 rounded-md ${getActiveClass("/admin/faqs")}`}>
                            <DocumentTextIcon className="h-5 w-5 text-black" />
                            <Link href="/admin/faqs" className="text-black">
                                FAQs
                            </Link>
                        </li>
                        <li className={`p-2 flex items-center space-x-2 hover:bg-amber-100 rounded-md ${getActiveClass("/admin/inquiry")}`}>
                            <ChatBubbleLeftRightIcon     className="h-5 w-5 text-black" />
                            <Link href="/admin/inquiry" className="text-black">
                                Submitted Inquiry
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Card>
        </div>
    )
}

export default Sidebar
