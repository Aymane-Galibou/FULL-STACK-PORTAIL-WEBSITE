import { LocalizedField } from "./localizedField";


export interface PresidentProfile {
  id: number;
  fullName: LocalizedField;
  message: LocalizedField;
  photoUrl?: string | null;
  isActive: boolean;
  updatedAt?: Date;
}