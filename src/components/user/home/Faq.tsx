"use client";

import { useEffect, useState } from "react";
import { getFAQs } from "@/components/admin/faqs/Action";

type FAQ = {
    id: number;
    question: string;
    answer: string;
};

export default function Faq() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const response = await getFAQs();
                setFaqs(response.records);
            } catch (error) {
                console.error("Error fetching FAQs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFAQs();

        const interval = setInterval(fetchFAQs, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <h2 className="mb-8 text-2xl sm:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white text-center">
                    Frequently Asked Questions
                </h2>


                {loading ? (
                    <p className="text-gray-500 dark:text-gray-400">Loading FAQs...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                        {faqs.map((faq) => (
                            <div className="mb-10" key={faq.id}>
                                <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                    <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                                    </svg>
                                    {faq.question}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
