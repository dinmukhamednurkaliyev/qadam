import type { RegionEntity } from "./region-entity";

export interface LocationEntity {
  id: string;
  city: string;
  region: RegionEntity;
}
