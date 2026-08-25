import type { JobEntity } from "~/types/job-entity";
import { jobs } from "./storage";

export function createJob(job: JobEntity) {
  jobs.push(job);

  return job;
}
