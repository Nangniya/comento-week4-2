export const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z.]{2,6}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

export function isFormatValid(inputString, regexPattern) {
  const regex = new RegExp(regexPattern);
  return regex.test(inputString);
}
