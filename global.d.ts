// eslint-disable-next-line no-unused-vars
interface Window {
  recaptchaVerifier: RecaptchaVerifier | undefined
  confirmationResult: ConfirmationResult | undefined
  signInData: {name: string; mobile: string} | undefined
}
