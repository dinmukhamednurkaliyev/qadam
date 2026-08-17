import { getJobsService } from "../../services/jobs/get-jobs";

export default defineEventHandler(() => {
  return getJobsService();
});
