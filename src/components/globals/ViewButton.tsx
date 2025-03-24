"use client";

import React from "react";
import { Button } from "@heroui/button";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  url: string;
};

const ViewBtn = ({ title, url }: Props) => {
  const router = useRouter();

  return (
    <>
      <Button
        size="sm"
        color="primary"
        isIconOnly={true}
        title={title}
        onPress={() => router.push(url)}
      >
        <FaEye size={14} />
      </Button>
    </>
  );
};

export default ViewBtn;