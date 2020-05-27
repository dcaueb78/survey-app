export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missing error: ${paramName}`);
    this.name = 'MissingParamError';
  }
}
