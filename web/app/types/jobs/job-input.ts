import type { SalaryCurrency, WorkFormat } from "../entities/job-value";

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
