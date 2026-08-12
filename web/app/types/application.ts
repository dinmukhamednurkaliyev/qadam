export type ApplicationStatus = "saved" | "applied" | "interview" | "offer" | "rejected";

export interface Application {
  id: string;
  jobId: string;
  status: ApplicationStatus;
  note?: string;
  appliedAt?: string;
  createdAt: string;
  updatedAt: string;
}
