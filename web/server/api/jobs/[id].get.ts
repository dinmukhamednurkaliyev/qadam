import type { HhVacancy } from "../../integrations/hh/types";
import { mapHhVacancyToJob } from "../../integrations/hh/mapper";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Job ID is required",
    });
  }

  const vacancy = await $fetch<HhVacancy>(`https://api.hh.ru/vacancies/${id}`, {
    query: {
      host: "hh.kz",
    },
  });

  return mapHhVacancyToJob(vacancy);
});
