import { CreateUserDto } from "../../src/api/controllers/sa/users/dto";
import * as request from "supertest";
import { SaEndpoints } from "../../libs/shared/endpoints";
import { AuthType, CredentialType } from "../types";

export class UserRequest {
  constructor(private readonly server: any) {}

  createUser(body: CreateUserDto, credential: CredentialType) {
    const _credential = {}
    if (credential.type === AuthType.Basic) {
      _credential = {}
    }
    it('', async () => {
      const response = await request(this.server)
        .post(SaEndpoints.create())
        .auth(token, { type: 'bearer' })
        .auth(superUser.login, superUser.password, {
          type: 'basic',
        })
        .send(body);
      console.log(response.body);
    });
  }
}