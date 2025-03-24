"use client";

import React, { useState } from "react";
import { TableRow, TableCell } from "@heroui/table";
import { Column } from "@/components/globals/types";
import { Service as Record, ServiceRow as Row } from "./Types";
import { Category } from "../service_category/Types";
import { Types } from "../service_types/Types";
import UpdateModal from "./UpdateModal";
import DestroyModal from "@/components/globals/DestroyModal";
import { destroy } from "@/components/admin/services/Action";
import Image from "next/image";
import PreviewModal from "@/components/globals/PreviewModal";

const getRecord = (records: Record[], id: string): Record | undefined => {
  return records.find((record) => String(record.id) === id);
};

const RenderBody = (
  records: Record[],
  columns: Column[],
  rows: Row[],
  dependencies: {
    category: Category[];
    type: Types[];
  }
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

  const RenderCell = (
    record: Record | undefined,
    column: string,
    row: Row
  ) => {
    if (!record) return null;

    switch (column) {
      case "imageUrl":
        if (!record || !record.imageUrl) return "No Image";
        return (
          <>
            <img
              src={record.imageUrl}
              alt="Leluxe Image"
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
        );
      case "duration":
        return `${record.duration} ${record.durationUnit === "minutes" ? "Mins" : "Hrs"
          }`;

      case "actions":
        return (
          <div className="relative flex items-center space-x-4">
            <UpdateModal
              record={record}
              category={dependencies?.category ?? []}
              type={dependencies?.type ?? []}
            />
            <DestroyModal
              title="Services"
              action={destroy}
              id={String(record.id)}
            />
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
