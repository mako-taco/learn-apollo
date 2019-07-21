export function randomID(length: number = 16, radix = 26): string {
  let id = '';
  for (let i = 0; i < length; i++) {
    // tslint:disable-next-line:no-bitwise
    id += (~~(Math.random() * radix)).toString(radix);
  }
  return id;
}
