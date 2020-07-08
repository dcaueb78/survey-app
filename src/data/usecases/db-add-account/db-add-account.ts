import {
  AddAccount, AddAccountModel, AccountModel, Encrypter,
} from '../db-add-account/db-add-account-protocols';

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;

  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }

  async add(accoount: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(accoount.password);
    return new Promise((resolve) => resolve(null));
  }
}
