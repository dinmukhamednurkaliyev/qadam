export type WorkFormat = "remote" | "office" | "hybrid";

export type SalaryCurrency = "KZT" | "USD" | "EUR";

export interface Job {
  id: string;
  companyId: string;
  locationId?: string;

  title: string;
  description?: string;
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
