import { getJobs } from "../../repositories/job";

export default defineEventHandler(() => {
  return getJobs();
});
