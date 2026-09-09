


export const handleDirectDownload = async (fileUrl: string, fileName: string) => {
  try {
    // 1. Fetch the file data directly from Express static folder
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error("File fetch failed");

    // 2. Convert to Blob
    const blob = await response.blob();

    // 4. Create an invisible temporary anchor link to trigger browser download
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName
    document.body.appendChild(link);
    link.click();

    // 5. Cleanup
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download error:", error);
    // Fallback: Open in a new tab if blob download fails
    window.open(fileUrl, "_blank");
  }
};