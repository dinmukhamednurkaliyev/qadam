import { jobs } from "./storage";

export function getJobById(jobId: string) {
  return jobs.find((job) => job.id === jobId);
}
