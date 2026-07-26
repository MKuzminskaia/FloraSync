const MS_IN_DAY = 24 * 60 * 60 * 1000;

export type ScheduleInput = {
  intervalDays: number | null;
  lastWateredAt: string | null;
};

export function calculateNextWatering({
  intervalDays,
  lastWateredAt,
}: ScheduleInput): Date | null {
  if (intervalDays === null || lastWateredAt === null) {
    return null;
  }

  const lastWateredDate = new Date(lastWateredAt);
  const nextTimestamp = lastWateredDate.getTime() + intervalDays * MS_IN_DAY;
  return new Date(nextTimestamp);
}
