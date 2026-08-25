import type { UpdateJobInput } from "~/types/entities/job-entity";
import { updateJobService } from "../../services/jobs/update-job";

export default defineEventHandler(async (event) => {
  const jobId = getRouterParam(event, "id");

  if (!jobId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Job ID is required",
    });
  }

  const input = await readBody<UpdateJobInput>(event);

  const updatedJob = updateJobService(jobId, input);

  if (!updatedJob) {
    throw createError({
      statusCode: 404,
      statusMessage: "Job not found",
    });
  }

  return updatedJob;
});
