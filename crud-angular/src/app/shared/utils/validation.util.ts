export class ValidationUtil {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidString(value: string, minLength: number = 1): boolean {
    return typeof value === 'string' && value.trim().length >= minLength;
  }

  static isValidId(id: string): boolean {
    return typeof id === 'string' && id.trim().length > 0;
  }

  static sanitizeString(value: string): string {
    return value.trim();
  }
}
