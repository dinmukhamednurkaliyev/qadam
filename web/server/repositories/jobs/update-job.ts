import type { JobEntity } from "~/types/jobs/job-entity";
import { jobs } from "./storage";

export function updateJob(job: JobEntity) {
  const jobIndex = jobs.findIndex((currentJob) => currentJob.id === job.id);

  if (jobIndex === -1) {
    return undefined;
  }

  jobs[jobIndex] = job;

  return job;
}
