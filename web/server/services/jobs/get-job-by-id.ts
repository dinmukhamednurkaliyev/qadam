import { getJobById } from "../../repositories/jobs/get-job-by-id";

export function getJobByIdService(jobId: string) {
  return getJobById(jobId);
}
