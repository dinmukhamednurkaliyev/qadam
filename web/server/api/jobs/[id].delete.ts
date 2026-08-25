import { deleteJobService } from "~~/server/services/jobs/delete-job";

export default defineEventHandler((event) => {
  const jobId = getRouterParam(event, "id");

  if (!jobId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Job ID is required",
    });
  }

  const deletedJob = deleteJobService(jobId);

  if (!deletedJob) {
    throw createError({
      statusCode: 404,
      statusMessage: "Job not found",
    });
  }

  setResponseStatus(event, 204);
});
