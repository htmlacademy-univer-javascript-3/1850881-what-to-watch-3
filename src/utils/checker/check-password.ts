const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d).+$/;

export const checkPassword = (password: string) => PASSWORD_REGEXP.test(password);
