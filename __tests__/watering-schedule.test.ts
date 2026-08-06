import { parseIntervalDays } from "@/lib/watering-schedule";
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
