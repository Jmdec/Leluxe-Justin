"use client";

import React, { useState } from "react";
import { TableRow, TableCell } from "@heroui/table";
import { Column } from "@/components/globals/types";
import { Testimonial as Record, TestimonialRow as Row } from "./Types";
import DestroyModal from "@/components/globals/DestroyModal";
import {
  destroy,
} from "@/components/admin/testimonials/Action";
import Image from "next/image";
import UpdateModal from "./UpdateModal";
import ChipComponent from "@/components/globals/ChipComponent";
import EditModal from "./EditModal";
const getRecord = (records: Record[], id: string): Record | undefined => {
  return records.find((record) => String(record.id) === id);
};

import PreviewModal from "@/components/globals/PreviewModal";
const RenderBody = (
  records: Record[],
  columns: Column[],
  rows: Row[],
) => {
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

  const getRecord = (records: Record[], id: string): Record | undefined => {
    return records.find((record) => String(record.id) === id);
  };

  const RenderCell = (
    record: Record | undefined,
    column: string,
    row: Row,
  ) => {
    if (!record) return null;


    switch (column) {
      case "imageUrl":
        return record.imageUrl ? (
          <>
            <img
              src={record.imageUrl}
              alt="News"
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
      case "status":
        const statusColor = [
          { key: "Pending", label: "Pending", color: "warning" as "warning" },
          { key: "Accepted", label: "Accepted", color: "success" as "success" },
          { key: "Declined", label: "Declined", color: "danger" as "danger" },
          { key: "Done", label: "Done", color: "primary" as "primary" },
        ];

        const statusObj = statusColor.find(status => status.key === record.status);

        return statusObj ? (
          <ChipComponent
            status={statusObj.label}
            size="sm"
            variant="flat"
            color={statusObj.color}
          />
        ) : null;
      case "actions":
        return (
          <div className="relative flex items-center space-x-4">
            <EditModal
              record={record}
            />
            <UpdateModal record={record} action="accept" />
            <DestroyModal title="Testimonial" action={destroy} id={String(record.id)} />
          </div>
        );

      default:
        return row[column as keyof Row] ?? "";
    }
  };

  return (
    <>
      {rows.map((row) => {
        const record = getRecord(records, row.id);
        return (
          <TableRow key={row.id}>
            {columns.map((column) => (
              <TableCell key={column.key}>
                {RenderCell(record, column.key, row)}
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </>
  );
};

export default RenderBody;
