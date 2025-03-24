"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getNews } from '@/components/admin/news/Action';
import { Skeleton } from "@heroui/skeleton";
import { Card } from "@heroui/card";


export default function News() {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await getNews();
                setNews(response.records);
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
        const interval = setInterval(fetchNews, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="bg-white mt-20 dark:bg-gray-900">
            <div className="text-center py-6">
                <h1 className="text-4xl font-bold text-black dark:text-white mb-4">Latest News</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">Stay updated with the most recent news and insights.</p>
            </div>
            <div className="px-8 mx-auto lg:max-w-screen-xl sm:max-w-xl md:max-w-full sm:px-12 md:px-16 lg:py-10 sm:py-16">
                <div className="grid gap-x-8 gap-y-12 sm:gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                        <>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <Card key={index} className="w-[300px] space-y-5 p-4" radius="lg">
                                    <Skeleton className="rounded-lg">
                                        <div className="h-24 rounded-lg bg-default-300" />
                                    </Skeleton>
                                    <div className="space-y-3">
                                        <Skeleton className="w-4/5 rounded-lg">
                                            <div className="h-8 w-3/5 rounded-lg bg-default-200" />
                                        </Skeleton>
                                        <Skeleton className="w-5/5 rounded-lg">
                                            <div className="h-8 w-4/5 rounded-lg bg-default-200" />
                                        </Skeleton>
                                        <Skeleton className="w-3/5 rounded-lg">
                                            <div className="h-8 w-2/5 rounded-lg bg-default-300" />
                                        </Skeleton>
                                    </div>
                                </Card>
                            ))}
                        </>
                    ) : (
                        news.map((item) => (
                            <div key={item.id} className="relative flex flex-col h-full">
                                <a href={item.link} className="block overflow-hidden group rounded-xl shadow-lg">
                                    {item.imageUrl ? (
                                        <Image
                                            className="h-52 w-full object-cover"
                                            src={`${item.imageUrl}`}
                                            alt={item.title}
                                            width={300}
                                            height={300}
                                        />
                                    ) : (
                                        <div className="h-52 w-full bg-gray-200 flex justify-center items-center text-gray-500">
                                            No Image Available
                                        </div>
                                    )}
                                </a>
                                <div className="relative flex flex-col flex-grow mt-1 p-6 bg-white rounded-xl shadow-lg">
                                    <p className="uppercase font-semibold text-xs mb-2.5 text-yellow-600">{item.date.toLocaleDateString()}</p>
                                    <a href={item.link} className="block mb-3">
                                        <h2 className="text-2xl font-bold leading-5 text-black dark:text-white transition-colors duration-200 hover:text-yellow-600 dark:hover:text-yellow-500">
                                            {item.title}
                                        </h2>
                                    </a>
                                    <p className="mb-4 text-gray-700 dark:text-gray-300 flex-grow">{item.description}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
