const EMAIL_REGEXP = /\S+@\S+\.\S+/;

export const checkEmail = (email: string) => EMAIL_REGEXP.test(email);
