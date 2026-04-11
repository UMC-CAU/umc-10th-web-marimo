import LoginField from '../login/LoginField';

type SignupEmailValues = {
  email: string;
};

type SignupEmailFormProps = {
  values: SignupEmailValues;
  errors: Partial<Record<keyof SignupEmailValues, string>>;
  touched: Partial<Record<keyof SignupEmailValues, boolean>>;
  isValid: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const SignupEmailForm = ({
  values,
  errors,
  touched,
  isValid,
  onChange,
  onBlur,
  onSubmit,
}: SignupEmailFormProps) => {
  const shouldShowEmailError = Boolean(touched.email || values.email.length > 0);

  return (
    <div className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="space-y-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300/80">Create Account</p>
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">회원가입</h1>
        <p className="text-sm leading-6 text-slate-300">가입에 사용할 이메일 주소를 입력해 주세요.</p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
        <LoginField
          label="이메일"
          name="email"
          type="email"
          value={values.email}
          placeholder="name@example.com"
          autoComplete="email"
          error={errors.email}
          showError={shouldShowEmailError}
          onChange={onChange}
          onBlur={onBlur}
        />

        <button
          type="submit"
          disabled={!isValid}
          className="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
        >
          다음
        </button>
      </form>
    </div>
  );
};

export default SignupEmailForm;