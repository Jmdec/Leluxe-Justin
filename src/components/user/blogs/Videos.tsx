"use client";

import React, { useEffect, useState, useRef } from "react";
import { getAll as getVideos } from "@/components/admin/videos/Action";
import { Skeleton } from "@heroui/skeleton";
import { Card, CardBody } from "@heroui/card";
import { PlayIcon } from "@heroicons/react/24/outline";

export default function Videos() {
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const [isPlaying, setIsPlaying] = useState<boolean[]>([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await getVideos();
                setVideos(response.records);
                setIsPlaying(new Array(response.records.length).fill(false));
            } catch (error) {
                console.error("Error fetching videos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
        const interval = setInterval(fetchVideos, 5000);
        return () => clearInterval(interval);
    }, []);

    const handlePlay = (index: number) => {
        videoRefs.current.forEach((video, i) => {
            if (video && i !== index) {
                video.pause();
            }
        });

        if (videoRefs.current[index]) {
            videoRefs.current[index]?.play();
            setIsPlaying((prev) => prev.map((state, i) => (i === index ? true : false)));
        }
    };

    const handlePause = (index: number) => {
        setIsPlaying((prev) => prev.map((state, i) => (i === index ? false : state)));
    };
    return (
        <section className="bg-white mt-20 dark:bg-gray-900">
            <div className="text-center py-6">
                <h1 className="text-4xl font-bold text-black dark:text-white mb-4">Videos</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Stay updated with the latest trends and insights. Watch our videos to learn more!
                </p>
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
                        videos.map((item, index) => (
                            <Card>
                                <CardBody>
                                    <div key={index} className="relative flex flex-col h-full rounded-sm">
                                        <div className="relative w-full h-[250px] bg-[#0c0c1d] rounded-xl overflow-hidden">
                                            <video
                                                ref={(el) => {
                                                    videoRefs.current[index] = el;
                                                }}
                                                className="w-full h-full object-cover rounded-t-xl"
                                                poster="/images/logowithbg.png"
                                                onPause={() => handlePause(index)}
                                            >
                                                <source src={item.videoPath} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>


                                            {!isPlaying[index] && (
                                                <div
                                                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                                                    onClick={() => handlePlay(index)}
                                                >
                                                    <button className="bg-black/50 rounded-full p-2">
                                                        <PlayIcon className="w-6 h-6 text-white" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <div className="relative flex flex-col flex-grow justify-center mt-0 p-6 ">
                                            <a href={item.videoPath} target="_blank" rel="noopener noreferrer">
                                                <h2 className="text-2xl font-bold leading-5 text-black dark:text-white transition-colors duration-200 hover:text-yellow-600 dark:hover:text-yellow-500 cursor-pointer">
                                                    {item.title}
                                                </h2>
                                            </a>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
