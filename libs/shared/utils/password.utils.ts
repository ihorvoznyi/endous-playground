import * as crypto from 'crypto';

const SALT = 'AFnLASFFzzSAFkasfaF';

export const hashPassword = (password: string) => {
  return encryptSHAH256(password, SALT);
};

export const comparePassword = (password: string, hashPassword: string) => {
  return encryptSHAH256(password, SALT) === hashPassword;
};

// export const comparePassword = (password: string, hashedPassword: string) => {
//   return bcrypt.compare(password, hashedPassword);
// };

export const encryptSHAH256 = (text: string, salt: string) =>
  crypto.createHmac('sha256', salt).update(text).digest('hex');
