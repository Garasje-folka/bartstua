export type SaunaSchedule = {
  weekdays: number[] | null;
  startMinute: number;
  endMinute: number;
  duration: number;
  frequency: number;
};

export type SaunaData = {
  name: string;
  capacity: number;
  description: string;
  imageUrl: string;
  dropInPrice: number;
  wholeSaunaPrice: number;
  dropInSchedule: SaunaSchedule;
  wholeSaunaSchedule: SaunaSchedule;
};
