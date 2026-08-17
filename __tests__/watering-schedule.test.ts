import type { ScheduleInput } from "@/lib/watering-schedule";
import {
  calculateNextWatering,
  daysUntilWatering,
  parseIntervalDays,
} from "@/lib/watering-schedule";
import { describe, expect, test } from "@jest/globals";

const MS_IN_DAY = 24 * 60 * 60 * 1000;
const MS_IN_HOUR = 60 * 60 * 1000;

describe("parseIntervalDays", () => {
  test("returns 7 for the string '7'", () => {
    expect(parseIntervalDays("7")).toBe(7);
  });

  test("returns null for the empty string", () => {
    expect(parseIntervalDays("")).toBeNull();
  });

  test("returns null for the string 'abc'", () => {
    expect(parseIntervalDays("abc")).toBeNull();
  });

  test("returns null for the string '0'", () => {
    expect(parseIntervalDays("0")).toBeNull();
  });

  test("returns null for the string '-3'", () => {
    expect(parseIntervalDays("-3")).toBeNull();
  });

  test("returns null for the string '7.5'", () => {
    expect(parseIntervalDays("7.5")).toBeNull();
  });
});

describe("calculateNextWatering", () => {
  test("returns the date interval days after the last watering", () => {
    const input: ScheduleInput = {
      intervalDays: 7,
      lastWateredAt: "2026-07-01T10:00:00.000Z",
    };
    expect(calculateNextWatering(input)).toStrictEqual(
      new Date("2026-07-08T10:00:00.000Z"),
    );
  });

  test("returns null for the null intervalDays", () => {
    const input: ScheduleInput = {
      intervalDays: null,
      lastWateredAt: "2026-07-01T10:00:00.000Z",
    };
    expect(calculateNextWatering(input)).toBeNull();
  });

  test("returns null for the null lastWateredAt", () => {
    const input: ScheduleInput = {
      intervalDays: 7,
      lastWateredAt: null,
    };
    expect(calculateNextWatering(input)).toBeNull();
  });

  test("returns null for the 0 intervalDays", () => {
    const input: ScheduleInput = {
      intervalDays: 0,
      lastWateredAt: "2026-07-01T10:00:00.000Z",
    };
    expect(calculateNextWatering(input)).toBeNull();
  });

  test("returns null for the -3 intervalDays", () => {
    const input: ScheduleInput = {
      intervalDays: -3,
      lastWateredAt: "2026-07-01T10:00:00.000Z",
    };
    expect(calculateNextWatering(input)).toBeNull();
  });

  test("returns null for the lastWateredAt 'yesterday'", () => {
    const input: ScheduleInput = {
      intervalDays: 7,
      lastWateredAt: "yesterday",
    };
    expect(calculateNextWatering(input)).toBeNull();
  });
});

describe("daysUntilWatering", () => {
  test("returns 2 when the watering is 2 days ahead", () => {
    const now = new Date("2026-08-17T10:00:00.000Z");
    const nextWatering = new Date(now.getTime() + 2 * MS_IN_DAY);
    expect(daysUntilWatering({ nextWatering, now })).toBe(2);
  });

  test("returns -3 when the deadline is three days overdue", () => {
    const now = new Date("2026-08-17T10:00:00.000Z");
    const nextWatering: Date = new Date(now.getTime() - 3 * MS_IN_DAY);
    expect(daysUntilWatering({ nextWatering, now })).toBe(-3);
  });

  test("returns 0 when the day of watering is today", () => {
    const now = new Date("2026-08-17T10:00:00.000Z");
    const nextWatering = new Date(now.getTime());
    expect(daysUntilWatering({ nextWatering, now })).toBe(0);
  });

  test("returns 0 when the watering is 13 hours away", () => {
    const now = new Date("2026-08-17T10:00:00.000Z");
    const nextWatering: Date = new Date(now.getTime() + 13 * MS_IN_HOUR);
    expect(daysUntilWatering({ nextWatering, now })).toBe(0);
  });

  test("returns -1 when the watering was due 11 hours ago", () => {
    const now = new Date("2026-08-17T10:00:00.000Z");
    const nextWatering = new Date(now.getTime() - 11 * MS_IN_HOUR);
    expect(daysUntilWatering({ nextWatering, now })).toBe(-1);
  });

  test("returns null, when nextWatering is null", () => {
    const now = new Date("2026-08-17T10:00:00.000Z");
    const nextWatering = null;
    expect(daysUntilWatering({ nextWatering, now })).toBeNull();
  });
});
