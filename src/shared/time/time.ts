export class Time {
  public static minutes(count: number): number {
    return 60000 * count;
  }

  public static seconds(count: number): number {
    return 1000 * count;
  }
}
