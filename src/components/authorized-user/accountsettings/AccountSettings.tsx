'use client'

import React, { useEffect, useState } from "react";
import AuthorizedLayout from "../layout/AuthorizedLayout";
import { getUserById, updateEmail, updatePassword, deleteUser } from "./Action";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';


const AccountSettings = () => {
    const router = useRouter();
    const [user, setUser] = useState<{ email: string; id: string } | null | undefined>(undefined);
    const [newEmail, setNewEmail] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [emailUpdated, setEmailUpdated] = useState<boolean>(false);
    const [isEmailFormVisible, setIsEmailFormVisible] = useState<boolean>(false);
    const [passwordUpdated, setPasswordUpdated] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [isConfirmDelete, setIsConfirmDelete] = useState<boolean>(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = typeof window !== "undefined" ? localStorage.getItem('userId') : null;

                if (!userId) {
                    console.error("No user ID found in localStorage");
                    return;
                }

                const response = await getUserById(userId);

                if (response.success && response.user) {
                    setUser(response.user);
                    setNewEmail(response.user.email);
                } else {
                    console.error(response.message);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    const handleEmailChange = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newEmail || newEmail === user?.email) {
            toast.error("Existing Email");
            return;
        }

        if (user?.id) {
            try {
                const response = await updateEmail({ email: newEmail, userId: user.id });
                if (response.success) {
                    setEmailUpdated(true);
                    setUser((prev) => (prev ? { ...prev, email: newEmail } : prev));
                    setIsEmailFormVisible(false);
                    toast.success("Email updated successfully!");
                } else {
                    console.error(response.message);
                }
            } catch (error) {
                console.error("Error updating email:", error);
                toast.error("Something went wrong. Please try again!");
            }
        } else {
            console.error("User ID is missing.");
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentPassword || !newPassword) {
            toast.error("Please fill in both fields.");
            return;
        }

        if (user?.id) {
            try {
                const response = await updatePassword({
                    userId: user.id,
                    currentPassword,
                    newPassword,
                });

                if (response.success) {
                    setPasswordUpdated(true);
                    setCurrentPassword("");
                    setNewPassword("");
                    toast.success("Password updated successfully!");
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                console.error("Error updating password:", error);
                toast.error("Something went wrong. Please try again!");
            }
        } else {
            console.error("User ID is missing.");
        }
    };

    const verifyPasswordAndConfirmDeletion = async () => {
        if (!user?.id || !passwordInput) {
            toast.error("Please enter your password.");
            return;
        }

        try {
            const response = await updatePassword({
                userId: user.id,
                currentPassword: passwordInput,
                newPassword: passwordInput,
            });

            if (response.success) {
                setIsDeleteModalOpen(false);
                setIsConfirmDelete(true);
            } else {
                toast.error("Your credentials do not match.");
            }
        } catch (error) {
            console.error("Error verifying password:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    const handleAccountDeletion = async () => {
        if (!user?.id) return;

        try {
            const response = await deleteUser(user.id);
            if (response.success) {
                toast.success("Account deleted successfully.");
                setTimeout(() => {
                    router.push("/auth/login");
                }, 1500);
            } else {
                toast.error(response.message || "Failed to delete account.");
            }
        } catch (error) {
            toast.error("Something went wrong while deleting your account.");
        }
    };



    return (
        <AuthorizedLayout>
            <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
                <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
                    <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
                        <div className="pt-4">
                            <h2 className="py-2 text-2xl font-semibold">Account settings</h2>
                        </div>
                        <hr className="mt-4 mb-8" />

                        <div>
                            <h3 className="py-2 text-xl font-semibold">Email Address</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-gray-600">
                                    Your email address is <strong>{user?.email || "Loading..."}</strong>
                                </p>
                                <button
                                    className="text-sm font-semibold text-blue-600 underline decoration-2"
                                    onClick={() => setIsEmailFormVisible(prev => !prev)}
                                >
                                    Change
                                </button>
                            </div>

                            {isEmailFormVisible && !emailUpdated ? (
                                <form onSubmit={handleEmailChange} className="mt-4">
                                    <input
                                        type="email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        className="w-full border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                        placeholder="Enter new email"
                                    />
                                    <button
                                        type="submit"
                                        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
                                    >
                                        Save Email
                                    </button>
                                </form>
                            ) : null}

                        </div>
                        <hr className="mt-4 mb-8" />

                        <div>
                            <h3 className="py-2 text-xl font-semibold">Password</h3>
                            <div className="flex flex-col sm:flex-row sm:gap-4">
                                {["Current Password", "New Password"].map((label, index) => (
                                    <label key={index} className="w-full">
                                        <span className="text-sm text-gray-500">{label}</span>
                                        <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                            <input
                                                type="password"
                                                className="w-full border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                                placeholder="***********"
                                                value={index === 0 ? currentPassword : newPassword}
                                                onChange={(e) => index === 0 ? setCurrentPassword(e.target.value) : setNewPassword(e.target.value)}
                                            />
                                        </div>
                                    </label>
                                ))}
                            </div>
                            <button
                                onClick={handlePasswordChange}
                                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
                            >
                                Save Password
                            </button>
                        </div>

                        <hr className="mt-4 mb-8" />

                        <div>
                            <h3 className="py-2 text-xl font-semibold">Delete Account</h3>
                            <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-2 h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Proceed with caution
                            </p>
                            <p className="mt-2">
                                Make sure you have taken backup of your account in case you ever need to get
                                access to your data. We will completely wipe your data. There is no way to
                                access your account after this action.
                            </p>
                            <button
                                className="ml-auto text-sm font-semibold text-rose-600 underline decoration-2 mb-4"
                                onClick={() => setIsDeleteModalOpen(true)}
                            >
                                Continue with deletion
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg">
                        <h3 className="text-lg font-semibold">Enter Your Password</h3>
                        <input
                            type="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            className="w-full border p-2 mt-2"
                            placeholder="Enter password"
                        />
                        <div className="mt-4 flex justify-end">
                            <button className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={() => setIsDeleteModalOpen(false)}>
                                Cancel
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={verifyPasswordAndConfirmDeletion}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isConfirmDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg">
                        <h3 className="text-lg font-semibold">Are you sure you want to delete your account?</h3>
                        <div className="mt-4 flex justify-end">
                            <button className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={() => setIsConfirmDelete(false)}>
                                Cancel
                            </button>
                            <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={handleAccountDeletion}>
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </AuthorizedLayout>
    );
};

export default AccountSettings;
