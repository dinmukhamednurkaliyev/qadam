import type { CreateJobInput, Job } from "~/types/job";
import { createJob } from "../../repositories/jobs/create-job";

export function createJobService(input: CreateJobInput) {
  const now = new Date().toISOString();

  const job: Job = {
    id: crypto.randomUUID(),
    ...input,
    createdAt: now,
    updatedAt: now,
  };

  return createJob(job);
}
