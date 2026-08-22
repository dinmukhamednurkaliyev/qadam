import type { Job } from "~/types/job";
import { jobs } from "./storage";

export function createJob(job: Job) {
  jobs.push(job);

  return job;
}
