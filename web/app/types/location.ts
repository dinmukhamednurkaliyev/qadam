import type { Region } from "./region";

export interface Location {
  id: string;
  city: string;
  region: Region;
}
