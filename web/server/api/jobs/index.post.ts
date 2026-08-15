import type { CreateJobInput, Job } from "~/types/job";
import { createJob } from "../../repositories/job";

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

  const now = new Date().toISOString();

  const job: Job = {
    id: crypto.randomUUID(),
    ...input,
    createdAt: now,
    updatedAt: now,
  };

  const createdJob = createJob(job);

  setResponseStatus(event, 201);

  return createdJob;
});
