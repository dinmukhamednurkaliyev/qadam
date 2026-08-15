import type { Job, UpdateJobInput } from "~/types/job";

const jobs: Job[] = [];

export function createJob(job: Job) {
  jobs.push(job);

  return job;
}

export function getJobs() {
  return jobs;
}

export function getJobById(id: string) {
  return jobs.find((job) => job.id === id);
}

export function updateJob(id: string, input: UpdateJobInput) {
  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return undefined;
  }

  const updatedJob: Job = {
    ...job,
    ...input,

    company: {
      ...job.company,
      ...input.company,
    },

    location: {
      ...job.location,
      ...input.location,
    },

    updatedAt: new Date().toISOString(),
  };

  const index = jobs.findIndex((job) => job.id === id);

  jobs[index] = updatedJob;

  return updatedJob;
}
