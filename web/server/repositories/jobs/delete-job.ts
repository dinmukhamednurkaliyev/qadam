import { jobs } from "./storage";

export function deleteJob(jobId: string) {
  const jobIndex = jobs.findIndex((job) => job.id === jobId);

  if (jobIndex === -1) {
    return false;
  }

  jobs.splice(jobIndex, 1);

  return true;
}
