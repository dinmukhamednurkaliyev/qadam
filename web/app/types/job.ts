import type { Company } from "./company";
import type { Location } from "./location";

export type WorkFormat = "remote" | "office" | "hybrid";

export type SalaryCurrency = "KZT" | "USD" | "EUR";

export interface Job {
  id: string;
  title: string;
  description?: string;

  company: Company;
  location?: Location;

  sourceUrl?: string;
  workFormat?: WorkFormat;

  salaryFrom?: number;
  salaryTo?: number;
  salaryCurrency?: SalaryCurrency;

  createdAt: string;
  updatedAt: string;
}

export interface CreateJobInput {
  companyId: string;
  locationId?: string;

  title: string;
  description?: string;

  sourceUrl?: string;
  workFormat?: WorkFormat;

  salaryFrom?: number;
  salaryTo?: number;
  salaryCurrency?: SalaryCurrency;
}

export interface UpdateJobInput {
  companyId?: string;
  locationId?: string;

  title?: string;
  description?: string;

  sourceUrl?: string;
  workFormat?: WorkFormat;

  salaryFrom?: number;
  salaryTo?: number;
  salaryCurrency?: SalaryCurrency;
}
