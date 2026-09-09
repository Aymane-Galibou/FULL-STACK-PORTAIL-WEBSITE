export interface BilingualText {
  FR: string;
  AR: string;
}

export interface CouncilMember {
  id: number;
  fullName: BilingualText;
  role: BilingualText;
  politicalParty: BilingualText;
  photoUrl?: string;
  isBureauMember: boolean;
  bureauOrder: number;
}