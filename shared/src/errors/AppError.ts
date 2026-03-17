const HTTP_STATUS_MESSAGES: Record<number, string> = {
  400: 'Bad request.',
  404: 'Not found.',
  409: 'This resource already exists.',
  422: 'Invalid input.',
  500: 'An unexpected error occurred.',
}

export class AppError extends Error {
  constructor(public readonly status: number) {
    super(AppError.messageFor(status))
    this.name = 'AppError'
  }

  static messageFor(status: number): string {
    return HTTP_STATUS_MESSAGES[status] ?? 'An unexpected error occurred.'
  }
}
