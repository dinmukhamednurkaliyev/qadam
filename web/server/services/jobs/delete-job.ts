import { deleteJob } from "../../repositories/jobs/delete-job";

export function deleteJobService(jobId: string) {
  return deleteJob(jobId);
}
