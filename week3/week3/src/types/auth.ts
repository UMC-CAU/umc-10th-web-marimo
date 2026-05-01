export type LoginFormValues = {
  email: string;
  password: string;
};

export type SignupFormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
};

export type AuthSession = {
  email: string;
  nickname: string;
  token: string;
};
