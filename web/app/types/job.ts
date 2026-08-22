export interface Job {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;

  company: {
    name: string;
    website?: string;
  };

  location: {
    city: string;
    country: string;
  };
}

export interface CreateJobInput {
  title: string;
  content: string;

  company: {
    name: string;
    website?: string;
  };

  location: {
    city: string;
    country: string;
  };
}

export interface UpdateJobInput {
  title?: string;
  content?: string;

  company?: {
    name?: string;
    website?: string;
  };

  location?: {
    city?: string;
    country?: string;
  };
}
