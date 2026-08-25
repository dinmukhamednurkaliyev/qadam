export interface Region {
  id: string;
  name: string;
  code: string;
}

export interface Location {
  id: string;
  regionId: string;
  city: string;
}
