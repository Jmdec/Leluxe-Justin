"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAll } from "@/components/admin/our_team/Action";
import { Skeleton } from "@heroui/skeleton";

export type OurTeam = {
    id: string;
    name: string;
    position: string;
    imageUrl: string;
};

export default function OurTeamComponent() {
    const [data, setData] = useState<OurTeam[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAll();
                setData(response.records);
            } catch (error) {
                console.error("Error fetching:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    const ceo = data.find((member) => member.position === "CEO");
    const staff = data.filter((member) => member.position !== "CEO");

//     return (
//         // <section className="bg-white dark:bg-gray-900 py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
//         //     <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
//         //         <h2 className="mb-4 text-3xl md:text-4xl font-bold font-manrope text-gold-500 dark:text-white">
//         //             Our Team
//         //         </h2>
//         //         <p className="font-normal text-gray-500 sm:text-lg dark:text-gray-400">
//         //             Meet the amazing team behind our success.
//         //         </p>
//         //     </div>

//         //     {loading ? (
//         //         <Skeleton className="w-36 h-36 mx-auto mb-4 rounded-full" />
//         //     ) : ceo ? (
//         //         <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
//         //             <div className="text-center text-gray-500 dark:text-gray-400 col-span-full">
//         //                 <Image
//         //                     className="mx-auto mb-4 w-36 h-36 rounded-full border-4 border-gold-500"
//         //                     src={ceo.imageUrl}
//         //                     width={100}
//         //                     height={100}
//         //                     alt={`${ceo.name} Avatar`}
//         //                 />
//         //                 <h3 className="mb-1 text-xl md:text-2xl font-bold tracking-tight text-gold-500 dark:text-white">
//         //                     {ceo.name}
//         //                 </h3>
//         //                 <p className="text-sm md:text-base">{ceo.position}</p>
//         //             </div>
//         //         </div>
//         //     ) : null}

//         //     <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center mt-5">
//         //         {loading ? (
//         //             [...Array(3)].map((_, index) => (
//         //                 <div key={index} className="text-center text-gray-500 dark:text-gray-400 col-span-1">
//         //                     <Skeleton className="w-36 h-36 mx-auto mb-4 rounded-full" />
//         //                     <Skeleton className="w-3/4 mx-auto mb-2 h-6" />
//         //                     <Skeleton className="w-1/2 mx-auto h-5" />
//         //                 </div>
//         //             ))
//         //         ) : (
//         //             staff.map((member) => (
//         //                 <div key={member.id} className="text-center text-gray-500 dark:text-gray-400">
//         //                     <Image
//         //                         className="mx-auto mb-4 w-36 h-36 rounded-full border-4 border-gold-500"
//         //                         src={member.imageUrl}
//         //                         width={100}
//         //                         height={100}
//         //                         alt={`${member.name} Avatar`}
//         //                     />
//         //                     <h3 className="mb-1 text-xl md:text-2xl font-bold tracking-tight text-gold-500 dark:text-white">
//         //                         {member.name}
//         //                     </h3>
//         //                     <p className="text-sm md:text-base">{member.position}</p>
//         //                 </div>
//         //             ))
//         //         )}
//         //     </div>
//         // </section>
//     );
}
