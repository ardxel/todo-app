import { CustomError } from 'ts-custom-error';

export default class BaseError extends CustomError {
  public readonly statusCode: number;

  constructor (message, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}