export function isValidDate(userDate: Date): boolean {
  return !Number.isNaN(userDate.getTime());
}
