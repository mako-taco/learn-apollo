import { ValidationResult } from './validation';

const usernameMinLength = 4;
const usernameMaxLength = 32;
export function validateUsername(username: string): ValidationResult {
  if (username.length < usernameMinLength) {
    return {
      valid: false,
      errors: [`Username must be at least ${usernameMinLength} characters long`],
    };
  }

  if (username.length > usernameMaxLength) {
    return {
      valid: false,
      errors: [`Username can be at most ${usernameMaxLength} characters long`],
    };
  }

  return { valid: true };
}
