import { LocalizedField } from "./localizedField";


export interface Project {
  id: number;
  title: LocalizedField;
  description: LocalizedField;
  category: LocalizedField;
  status: LocalizedField;
  startDate: LocalizedField;
  completionDate: LocalizedField;
  budget: LocalizedField;
  locationZone: LocalizedField;
  partners: LocalizedField;
  progressPercentage: number;
  mainImage: string;
  galleryImages: string[];
  attachments: string[];
}

