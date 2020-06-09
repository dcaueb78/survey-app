import { AddAccount, AddAccountModel } from '../../../domain/usecases/addAccount';
import { AccountModel } from '../../../domain/models/account';
import { Encrypter } from '../../protocols/encrypter';

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
