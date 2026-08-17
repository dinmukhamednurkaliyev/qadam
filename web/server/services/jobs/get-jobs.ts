import { getJobs } from "../../repositories/jobs/get-jobs";

export function getJobsService() {
  return getJobs();
}