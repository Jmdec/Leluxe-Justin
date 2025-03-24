import React, { useState } from 'react';

interface Blog {
    id: string;
    imageUrl: string;
    title: string;
    description: string;
    author: string;
    date: string;
}

export default function Blogs() {
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

    const blogs: Blog[] = [
        {
            id: "1",
            imageUrl: "https://juantap-bakit.s3.ap-southeast-1.amazonaws.com/avatars/sakamoto-days-anime-hd-wallpaper-uhdpaper.com-239%405%40a.jpg",
            title: "Sakamoto Days",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, cumque! Dicta aspernatur at quibusdam voluptatem eveniet voluptas distinctio debitis asperiores? Repudiandae dicta, minus perferendis ullam incidunt maxime veniam error iure?",
            author: "John Doe",
            date: "March 19, 2025",
        }
    ];

    const openModal = (blog: Blog) => {
        setSelectedBlog(blog);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedBlog(null);
    };

    return (
        <div className="py-12">
            <div className="relative mx-auto max-w-7xl">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">Le Luxe Clinic Blogs</h2>
                    <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-500 font-normal:mt-4">
                        Discover expert insights on beauty, skincare, and wellness.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 py-8">
                    {loading ? (
                        <>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="w-[300px] space-y-5 p-4 bg-gray-200 rounded-lg">
                                    <div className="h-24 bg-gray-300 rounded-lg" />
                                    <div className="space-y-3">
                                        <div className="h-8 w-3/5 bg-gray-300 rounded-lg" />
                                        <div className="h-8 w-4/5 bg-gray-300 rounded-lg" />
                                        <div className="h-8 w-2/5 bg-gray-300 rounded-lg" />
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        blogs.map((blog) => (
                            <div key={blog.id} className="bg-white p-4 rounded-lg shadow-md">
                                <div>
                                    <img
                                        className="object-cover w-full h-48 rounded-lg"
                                        src={blog.imageUrl}
                                        alt={blog.title}
                                    />
                                </div>

                                <div className="py-2">
                                    <a href="#" className="mt-1 block">
                                        <p className="text-xl font-semibold text-gray-900">{blog.title}</p>
                                        <p className="text-base text-gray-500 line-clamp-3">{blog.description}</p>
                                    </a>
                                </div>

                                <div className="flex justify-between items-center py-2">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            <a href="#" className="hover:underline">{blog.author}</a>
                                        </p>
                                        <div className="flex space-x-1 text-sm text-gray-500">
                                            <time dateTime={blog.date}>{blog.date}</time>
                                            <span aria-hidden="true">·</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <button
                                            onClick={() => openModal(blog)}
                                            className="inline-block text-yellow-600 font-medium"
                                        >
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal */}
            {modalOpen && selectedBlog && (
                <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-semibold text-gray-900">{selectedBlog.title}</h2>
                            <button
                                onClick={closeModal}
                                className="text-blue-600 font-semibold"
                            >
                                Close
                            </button>
                        </div>
                        <p className="mt-4 text-gray-700">{selectedBlog.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
