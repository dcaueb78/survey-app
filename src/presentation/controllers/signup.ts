import {
  HttpRequest, HttpResponse, Controller, EmailValidator,
} from '../protocols';
import { badRequest, serverError } from '../protocols/helpers/http-helper';
import { MissingParamError, InvalidParamError } from '../errors';

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const { email, password, passwordConfirmation } = httpRequest.body;
      if (passwordConfirmation !== password) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }
      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }

      return {
        statusCode: 200,
        body: 'sucess',
      };
    } catch (error) {
      return serverError();
    }
  }
}
