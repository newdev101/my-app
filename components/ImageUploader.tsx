"use client";

import { useState } from "react";

export default function ImageUploader() {
  const [original, setOriginal] = useState<File | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginal(file);
    setCompressedUrl(null);
    setCompressedSize(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("https://backend-my-app-yif1.onrender.com/compress", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const blob = await response.blob();

      setCompressedSize(blob.size);
      setCompressedUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error("Compression failed:", err);
    }
  }

  function formatMB(bytes: number) {
    return (bytes / (1024 * 1024)).toFixed(2);
  }

  function reductionPercentage(originalBytes: number, compressedBytes: number) {
    return Math.round(((originalBytes - compressedBytes) / originalBytes) * 100);
  }

  function handleDownload() {
    if (!compressedUrl) return;

    // Create a temporary anchor to trigger download
    const a = document.createElement("a");
    a.href = compressedUrl;
    a.download = "compressed.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Reset state to initial
    setOriginal(null);
    setCompressedUrl(null);
    setCompressedSize(null);

    // Optional: revoke object URL to free memory
    URL.revokeObjectURL(compressedUrl);
  }

  return (
    <div className="border-2 border-dashed border-gray-400 rounded-xl p-6 max-w-lg w-full mx-auto sm:p-8">
      <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm" />

      {original && compressedSize && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Original: {formatMB(original.size)} MB → Compressed: {formatMB(compressedSize)} MB (
            {reductionPercentage(original.size, compressedSize)}% smaller)
          </p>
        </div>
      )}

      {compressedUrl && (
        <div className="mt-4">
          <button
            onClick={handleDownload}
            className="bg-teal-500 text-white px-4 py-2 rounded-md inline-block mt-2 hover:bg-teal-600 w-full sm:w-auto text-center"
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
}
