import {
    XMarkIcon
} from '@heroicons/react/16/solid'
import { GrUserSettings } from "react-icons/gr";
import { FaRegCalendarCheck, FaRegCalendarAlt  } from "react-icons/fa";
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
                        <li className={`p-2 flex items-center space-x-2 hover:bg-amber-100 rounded-md ${getActiveClass("/user/appointment-form?userId=${sessionStorage.getItem('userId')}")}`}>
                            <FaRegCalendarCheck className="h-5 w-5 text-black" />
                            <Link href={`/user/appointment-form?userId=${sessionStorage.getItem('userId')}`} target="_blank" className="text-black">
                                Book Appointment
                            </Link>
                        </li>
                        <li className={`p-2 flex items-center space-x-2 hover:bg-amber-100 rounded-md ${getActiveClass("/authorized-user/appointments")}`}>
                            <FaRegCalendarAlt  className="h-5 w-5 text-black" />
                            <Link href="/authorized-user/appointment" className="text-black">
                               View Appointments
                            </Link>
                        </li>
                        <li className={`p-2 flex items-center space-x-2 hover:bg-amber-100 rounded-md ${getActiveClass("/authorized-user/services")}`}>
                            <GrUserSettings className="h-5 w-5 text-black" />
                            <Link href="/authorized-user/account-settings" className="text-black">
                                Account Settings
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Card>
        </div>
    )
}

export default Sidebar
