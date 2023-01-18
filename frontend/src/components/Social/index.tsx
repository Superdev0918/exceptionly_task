export type objectType = {
    [key: string]: any
}

export type IResolveParams = {
    provider: string
    data?: objectType
}

export type TypeCrossFunction = {
    onLogout: () => void
}

export { default as LoginSocialLinkedin } from './LoginSocialLinkedin'
export { default as LoginSocialMicrosoft } from './LoginSocialMicrosoft'
export { default as LoginSocialGoogle } from './LoginSocialGoogle'