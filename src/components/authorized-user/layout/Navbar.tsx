import { Bars4Icon } from "@heroicons/react/20/solid";
import React from "react";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { logout } from "@/components/auth/Action";

const Navbar = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
    const router = useRouter();

    const handleLogout = async () => {
        const response = await logout();

        if (response.success) {
            toast.success(response.message);
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("accountID");
            router.push("/auth/login");
        } else {
            toast.error(response.message);
        }
    };

    return (
        <div className="border-b-1 shadow-md border-gray-200 p-3 dark:bg-gray-800">
            <div className="flex justify-between items-center">
                <div>
                    <button
                        className="lg:hidden p-2 text-gray-700"
                        onClick={onToggleSidebar}
                    >
                        <Bars4Icon className="w-6 h-6 text-black dark:text-white" />
                    </button>
                </div>
                <div className="">
                    <Button color="danger" className="text-black text-sm lg:text-base" onClick={handleLogout}>
                        <p>Logout</p>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
