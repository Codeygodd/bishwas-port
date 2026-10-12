/** Nepal Standard Time (UTC+5:45) as a Date whose UTC fields hold the Kathmandu wall-clock. */
export function npt(): Date {
  return new Date(Date.now() + 345 * 60000);
}

export function pad(n: number): string {
  return (n < 10 ? '0' : '') + n;
}
