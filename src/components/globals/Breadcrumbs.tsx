"use client";

import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DynamicBreadcrumbs() {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);

    return (
        <Breadcrumbs className="text-sm text-gray-600">
            {pathSegments.map((segment, index) => {
                const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
                const formattedSegment = segment.replace(/-/g, " ");

                return (
                    <BreadcrumbItem key={href}>
                        <Link  href="" className="text-black capitalize">
                            {formattedSegment}
                        </Link>
                    </BreadcrumbItem>
                );
            })}
        </Breadcrumbs>
    );
}
