interface ICredentialInterface {
    type: AuthType,
    login: string,
    password: string,
    token: string,
}

export enum AuthType {
    Basic = 'basic',
    Bearer = 'bearer'
}


export type CredentialType = Partial<ICredentialInterface>
