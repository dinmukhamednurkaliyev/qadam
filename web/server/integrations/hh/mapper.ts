import type { Job } from "../../../app/types/job";
import type { HhVacancy } from "./types";

export function mapHhVacancyToJob(vacancy: HhVacancy): Job {
  return {
    id: `hh${vacancy.id}`,
    source: "hh",
    externalId: vacancy.id,
    title: vacancy.name,
    company: vacancy.employer.name,
    location: vacancy.area.name,
    description: vacancy.description,
    url: vacancy.alternate_url,
    createdAt: vacancy.published_at,
  };
}
