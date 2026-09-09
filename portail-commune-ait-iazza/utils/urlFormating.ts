export const BACKEND_DOMAIN =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

const FALLBACK_IMAGE = "/images/placeholder-avatar.png";

const FALLBACK_PDF = `${BACKEND_DOMAIN}/uploads/documents/fallback-pdf`;


export const getFormatedUrl = (path: string | null | undefined,fileType:string='img'): string => {

  if (!path || !path.trim()) {
    return fileType =='img' ? FALLBACK_IMAGE : FALLBACK_PDF
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${BACKEND_DOMAIN}${cleanPath}`;
};
