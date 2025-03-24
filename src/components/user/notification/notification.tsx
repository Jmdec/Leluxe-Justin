"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";
import { getNotifications, markNotificationsAsRead } from "@/components/admin/appointment/Action";
import { NotificationType } from "@/components/admin/appointment/Types";

const Notification: React.FC = () => {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const storedUserId = sessionStorage.getItem("userId");
        setUserId(storedUserId);

        if (storedUserId) {
            fetchNotifications(storedUserId);
            const interval = setInterval(() => fetchNotifications(storedUserId), 5000);
            return () => clearInterval(interval);
        }
    }, []);

    const fetchNotifications = async (userId: string) => {
        const response = await getNotifications(userId);
        if (response.code === 200) {
            const unreadNotifications = response.records.filter((notif: NotificationType) => !notif.isRead);
            setNotifications(unreadNotifications);
        } else {
            console.error("Error fetching notifications:", response.message);
        }
    };

    const handleOpenModal = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (!isOpen && notifications.length > 0 && userId) {
            markNotificationsAsRead(userId).then(() => {
                setNotifications([]);
            });
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    if (!userId) return null;

    return (
        <div className="relative" ref={modalRef}>
            <div className="relative cursor-pointer" onClick={handleOpenModal}>
                <FaBell className="w-6 h-6 text-gray-800" />
                {notifications.length > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                        {notifications.length}
                    </span>
                )}
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-2">
                    <h3 className="text-sm font-semibold mb-2">Notifications</h3>
                    {notifications.length === 0 ? (
                        <p className="text-gray-500 text-sm">No new notifications</p>
                    ) : (
                        notifications.map((notif) => (
                            <div key={notif.id} className="p-2 border-b last:border-none text-sm text-gray-700">
                                {notif.message}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Notification;
