import type { Job } from "~/types/job";
import { jobs } from "./storage";

export function updateJob(job: Job) {
  const jobIndex = jobs.findIndex((currentJob) => currentJob.id === job.id);

  if (jobIndex === -1) {
    return undefined;
  }

  jobs[jobIndex] = job;

  return job;
}
