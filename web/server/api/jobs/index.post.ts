import type { CreateJobInput } from "~/types/job";
import { createJobService } from "../../services/jobs/create-job";

export default defineEventHandler(async (event) => {
  const input = await readBody<CreateJobInput>(event);

  if (!input.title?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: "Job title is required",
    });
  }

  if (!input.company?.name?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: "Company name is required",
    });
  }

  if (!input.location?.city?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: "City is required",
    });
  }

  if (!input.location?.country?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: "Country is required",
    });
  }

  const createdJob = createJobService(input);

  setResponseStatus(event, 201);

  return createdJob;
});
