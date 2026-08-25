import type { SalaryCurrency, WorkFormat } from "~/types/job-value";

export interface JobRecord {
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
