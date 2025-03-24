"use client";

import React, { useState } from "react";
import { TableRow, TableCell } from "@heroui/table";
import { Column } from "@/components/globals/types";
import {
    News as Record,
    NewsRow as Row,
} from "./Types";
import UpdateModal from "./UpdateModal";
import DestroyModal from "@/components/globals/DestroyModal";
import { destroy } from "./Action";
import Image from "next/image";
import PreviewModal from "@/components/globals/PreviewModal";
import { formatToDate, truncateText } from "@/components/globals/Utils";
import SeeMoreModal from "@/components/globals/SeeMoreModal";

const RenderBody = (records: Record[], columns: Column[], rows: Row[]) => {
    const [isPreviewOpen, setPreviewOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const onClick = (url: string) => {
        console.log("clicked", url);
        setImageUrl(url);
        setPreviewOpen(true);
    };

    const onCloseModal = () => {
        setPreviewOpen(false);
    };

    const getRecord = (records: Record[], id: number) => {
        return records.find((record) => record.id == id) as Record;
    };

    const RenderCell = (record: Record, column: string, row: Row) => {
        switch (column) {
            case "description":
                return (
                    <>
                        {truncateText(record.description, 50)}
                        {record.description.length > 50 && (
                            <SeeMoreModal title="Full Description" content={record.description} />
                        )}
                    </>
                );
            case "date":
                return formatToDate(record.date)
            case "imageUrl":
                return record.imageUrl ? (
                    <>
                        <Image
                            src={record.imageUrl}
                            alt="News"
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-md object-cover cursor-pointer"
                            onClick={() => onClick(record.imageUrl)}
                        />
                        {isPreviewOpen && (
                            <PreviewModal
                                isOpen={isPreviewOpen}
                                imageUrl={imageUrl}
                                onClose={onCloseModal}
                            />
                        )}
                    </>
                ) : (
                    "No Image"
                );

            case "actions":
                return (
                    <div className="relative flex  items-center gap-2">
                        <UpdateModal record={record} />
                        <DestroyModal title="News" action={destroy} id={String(record.id)} />
                    </div>
                );

            default:
                return row[column as keyof Row] ?? "";
        }
    };

    return (
        <>
            {rows.map((row) => (
                <TableRow key={row.id}>
                    {columns.map((column) => (
                        <TableCell key={column.key}>
                            {RenderCell(
                                getRecord(records, Number(row.id)),
                                column.key,
                                row
                            )}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );
};

export default RenderBody;
