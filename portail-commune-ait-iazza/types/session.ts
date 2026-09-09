export interface SessionReport {
  id: number;
  title: { FR: string; AR: string };
  sessionType: "ORDINARY" | "EXTRAORDINARY";
  sessionDate: string;
  year: number;
  thumbnailUrl?: string;
  pdfUrl: string;
  summary?: { FR: string; AR: string };
}