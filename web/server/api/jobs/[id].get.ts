import { getJobByIdService } from "../../services/jobs/get-job-by-id";

export default defineEventHandler((event) => {
  const jobId = getRouterParam(event, "id");

  if (!jobId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Job ID is required",
    });
  }

  const job = getJobByIdService(jobId);

  if (!job) {
    throw createError({
      statusCode: 404,
      statusMessage: "Job not found",
    });
  }

  return job;
});
