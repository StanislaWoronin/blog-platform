import { authConstant } from '../auth/auth.constant';

export const getExpirationDate = () => {
  const hours = 60;
  const minutes = 60;
  const second = 1000;
  const confirmationCodeTimeLife = Number(
    authConstant.timeLife.CONFIRMATION_CODE,
  );
  const addedTime = confirmationCodeTimeLife * hours * minutes * second;

  return new Date(new Date().getTime() + addedTime).toISOString();
};
