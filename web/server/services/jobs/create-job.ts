import type { JobEntity } from "~/types/jobs/job-entity";
import type { CreateJobInput } from "~/types/jobs/job-input";
import { createJob } from "../../repositories/jobs/create-job";

export function createJobService(input: CreateJobInput) {
  const now = new Date().toISOString();

  const job: JobEntity = {
    id: crypto.randomUUID(),
    ...input,
    createdAt: now,
    updatedAt: now,
  };

  return createJob(job);
}
