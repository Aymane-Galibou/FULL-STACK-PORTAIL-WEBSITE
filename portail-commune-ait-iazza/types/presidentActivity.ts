import { LocalizedField } from "./localizedField";

export interface AttachmentItem {
  title: LocalizedField;
  url: string;
}

export interface PresidentActivityAttributes {
  id: number;
  title: LocalizedField;
  summary: LocalizedField;
  content: LocalizedField;
  activityType: LocalizedField;
  location?: LocalizedField | null;
  eventDate: Date | string;
  mainImage: string;
  galleryImages: string[];
  attachments: AttachmentItem[];
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
