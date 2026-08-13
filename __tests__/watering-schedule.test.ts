import type { ScheduleInput } from "@/lib/watering-schedule";
import {
  calculateNextWatering,
  parseIntervalDays,
} from "@/lib/watering-schedule";
import { describe, expect, test } from "@jest/globals";

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
});
