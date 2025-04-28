export function assertNotNull<T>(
  value: T | null,
  message = 'Value cannot be null'
): asserts value is T {
  if (value === null) {
    throw new Error(message);
  }
}
