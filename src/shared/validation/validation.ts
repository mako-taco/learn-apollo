export type ValidationResult = { valid: boolean } & (
  | {
      valid: true;
    }
  | {
      valid: false;
      errors: string[];
    });
