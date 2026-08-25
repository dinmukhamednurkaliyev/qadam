import type { CompanyEntity } from "../companies/company-entity";
import type { LocationEntity } from "../locations/location-entity";
import type { SalaryCurrency, WorkFormat } from "./job-value";

export interface JobEntity {
  id: string;
  title: string;
  description?: string;

  company: CompanyEntity;
  location?: LocationEntity;

  sourceUrl?: string;
  workFormat?: WorkFormat;

  salaryFrom?: number;
  salaryTo?: number;
  salaryCurrency?: SalaryCurrency;

  createdAt: string;
  updatedAt: string;
}
