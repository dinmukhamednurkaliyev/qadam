export type JobSource = "hh" | "qadam";

export interface Job {
  id: string;
  source: JobSource;
  externalId?: string;
  title: string;
  company: string;
  location: string;
  description: string;
  url?: string;
  createdAt: string;
}
