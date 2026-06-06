export type Certification = "GIA" | "IGI" | "None";

export interface Diamond {
  id: number;
  stockId: string;
  type: "natural" | "lab" | "loose";
  shape: string;
  carat: number;
  color: string;
  clarity: string;
  cut: string;
  polish: string;
  symmetry: string;
  fluorescence: string;
  measurements: string;
  image: string;
  certification: Certification;
  imageUrl?: string;
  certificateNumber?: string;

  /** Optional extended fields — populated for legacy/hardcoded inventory,
   *  shown in the Quick View modal / Bloomberg-terminal table when present.
   *  Sanity-managed stones typically leave these undefined. */
  listedAmt?: number;
  listedPrCt?: number;
  listedDisc?: number;
  rap?: number;
  tableP?: number;
  depth?: number;
  ca?: number;
  pa?: number;
  ratio?: number;
  origin?: string;
  ha?: "Y" | "N" | string;
  shade?: string;
  loc?: string;
  certNo?: string;
}
