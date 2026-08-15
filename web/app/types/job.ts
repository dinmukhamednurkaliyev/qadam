export interface Job {
  id: string;
  title: string;
  description?: string;
  url?: string;

  company: {
    name: string;
    website?: string;
  };

  location: {
    city: string;
    country: string;
  };

  createdAt: string;
  updatedAt: string;
}

export interface CreateJobInput {
  title: string;
  description?: string;
  url?: string;

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
  description?: string;
  url?: string;

  company?: {
    name?: string;
    website?: string;
  };

  location?: {
    city?: string;
    country?: string;
  };
}
