import type { Job, UpdateJobInput } from "~/types/job";
import { getJobById } from "../../repositories/jobs/get-job-by-id";
import { updateJob } from "../../repositories/jobs/update-job";

export function updateJobService(jobId: string, input: UpdateJobInput) {
  const job = getJobById(jobId);

  if (!job) {
    return undefined;
  }

  const updatedJob: Job = {
    ...job,
    ...input,

    company: {
      ...job.company,
      ...input.company,
    },

    location: {
      ...job.location,
      ...input.location,
    },

    updatedAt: new Date().toISOString(),
  };

  return updateJob(updatedJob);
}
