'use client';

import { useEffect, useState } from "react";
import { getAll } from "@/components/admin/testimonials/Action";
import CreateModal from "@/components/user/home/TestimonialModal";
import {
    Button,
    Card,
    Skeleton,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

interface Testimonial {
    id: number;
    name: string;
    message: string;
    imageUrl: string;
    status: string;
}

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await getAll();
                const acceptedTestimonials = response.records.filter(
                    (testimonial: Testimonial) => testimonial.status === "Accepted"
                );
                setTestimonials(acceptedTestimonials);
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
        const interval = setInterval(fetchTestimonials, 5000);
        return () => clearInterval(interval);
    }, []);

    const openModal = (testimonial: Testimonial) => {
        setSelectedTestimonial(testimonial);
        setIsModalOpen(true);
    };

    return (
        <section className="py-12">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                        Trusted Reviews from Our Customers
                    </h2>
                    <CreateModal />
                </div>

                {loading ? (
                    <Card className="w-[300px] space-y-5 p-4" radius="lg">
                        <div className="space-y-3">
                            <Skeleton className="w-4/5 rounded-lg" />
                            <Skeleton className="w-5/5 rounded-lg" />
                            <Skeleton className="w-3/5 rounded-lg" />
                        </div>
                    </Card>
                ) : (
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        loop
                        className="w-full"
                    >
                        {testimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id}>
                                <div className="bg-white p-8 mb-4 rounded-lg shadow-lg border-t-4 border-yellow-500 flex flex-col items-start h-[280px]">
                                    <div className="flex items-center gap-4 mb-4">
                                        <img src={testimonial.imageUrl} alt={testimonial.name} className="w-16 h-16 rounded-full border-2 border-gray-300" />
                                        <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                                    </div>
                                    <p className="text-gray-700 text-justify flex-grow">
                                        {testimonial.message.length > 150
                                            ? `${testimonial.message.substring(0, 150)}... `
                                            : testimonial.message}
                                    </p>
                                    {testimonial.message.length > 150 && (
                                        <button
                                            className="text-yellow-500 hover:underline mt-2"
                                            onClick={() => openModal(testimonial)}
                                        >
                                            Read More
                                        </button>
                                    )}
                                </div>
                            </SwiperSlide>

                        ))}
                    </Swiper>
                )}
            </div>
            {selectedTestimonial && (
                <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
                    <ModalContent>
                        <ModalHeader>
                            <h2 className="text-xl font-bold">{selectedTestimonial.name}</h2>
                        </ModalHeader>
                        <ModalBody>
                            <p className="text-gray-700">{selectedTestimonial.message}</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={() => setIsModalOpen(false)} color="primary">
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </section>
    );
}
