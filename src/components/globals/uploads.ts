"use server"

import { put } from "@vercel/blob";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];

export const uploadFileToVercelBlob = async (file: File) => {
  try {
    if (!file) throw new Error("No file received");

    const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
    const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);

    if (!isImage && !isVideo) {
      throw new Error("Invalid file type. Only PNG, JPG, WebP, MP4, WebM, and OGG are allowed.");
    }

    if ((isImage && file.size > MAX_IMAGE_SIZE) || (isVideo && file.size > MAX_VIDEO_SIZE)) {
      throw new Error(`File size exceeds the limit. Max ${isImage ? "5MB" : "100MB"}.`);
    }

    const filePath = `uploads/${file.name}`;
    const blob = await put(filePath, file, { access: "public" });

    return { url: blob.url };
  } catch (error) {
    console.error("Upload failed:", error);
    return { error: "File upload failed" };
  }
};
