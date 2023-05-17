interface ICredential {
  login: string;
  password: string;
  token: string;
}

export type CredentialType = Partial<ICredential>;
