const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const checkPassword = (password: string) => PASSWORD_REGEXP.test(password);
