const MS_IN_DAY = 24 * 60 * 60 * 1000;

export type ScheduleInput = {
  intervalDays: number | null;
  lastWateredAt: string | null;
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
