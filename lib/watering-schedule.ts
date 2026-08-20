const MS_IN_DAY = 24 * 60 * 60 * 1000;

export type ScheduleInput = {
  intervalDays: number | null;
  lastWateredAt: string | null;
};

export type OverdueInput = {
  nextWatering: Date | null;
  now: Date;
};

export function parseIntervalDays(input: string): number | null {
  const inputParsed = Number(input);
  if (
    input.trim() === "" ||
    !Number.isInteger(inputParsed) ||
    inputParsed <= 0
  ) {
    return null;
  }
  return inputParsed;
}

export function calculateNextWatering({
  intervalDays,
  lastWateredAt,
}: ScheduleInput): Date | null {
  if (lastWateredAt === null) {
    return null;
  }
  const lastWateredDate = new Date(lastWateredAt);

  if (
    intervalDays === null ||
    intervalDays <= 0 ||
    Number.isNaN(lastWateredDate.getTime())
  ) {
    return null;
  }

  const nextTimestamp = lastWateredDate.getTime() + intervalDays * MS_IN_DAY;
  return new Date(nextTimestamp);
}

export function daysUntilWatering({
  nextWatering,
  now,
}: OverdueInput): number | null {
  if (nextWatering === null) {
    return null;
  }

  return Math.floor((nextWatering.getTime() - now.getTime()) / MS_IN_DAY);
}

export function nextWateringInfo({ nextWatering, now }: OverdueInput): string {
  if (nextWatering === null) return "No data";

  const days = daysUntilWatering({ nextWatering, now });
  const localDate = nextWatering.toLocaleDateString("en-GB");

  if (days === null) return "No data";
  if (days === 0) return `Watering is today: ${localDate}`;
  if (days === 1) return `Watering is in ${days} day: ${localDate}`;
  if (days === -1) return `Watering is ${-days} day overdue: ${localDate}`;
  if (days < 0) return `Watering is ${-days} days overdue: ${localDate}`;

  return `Watering is in ${days} days: ${localDate}`;
}
