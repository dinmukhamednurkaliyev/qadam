export interface HhVacancy {
  id: string;
  name: string;
  employer: {
    name: string;
  };
  area: {
    name: string;
  };
  description: string;
  alternate_url: string;
  published_at: string;
}
