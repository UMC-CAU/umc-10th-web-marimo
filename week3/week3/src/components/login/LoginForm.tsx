import LoginField from './LoginField';

type LoginFormValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  values: LoginFormValues;
  errors: Partial<Record<keyof LoginFormValues, string>>;
  touched: Partial<Record<keyof LoginFormValues, boolean>>;
  isValid: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
};

const LoginForm = ({
  values,
  errors,
  touched,
  isValid,
  onChange,
  onBlur,
  onSubmit,
  onBack,
}: LoginFormProps) => {
  const shouldShowEmailError = Boolean(touched.email || values.email.length > 0);
  const shouldShowPasswordError = Boolean(touched.password || values.password.length > 0);

  return (
    <div className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-xl text-slate-100 transition hover:bg-white/20"
        aria-label="이전 페이지로 이동"
      >
        &lt;
      </button>

      <div className="space-y-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300/80">Welcome Back</p>
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">로그인</h1>
        <p className="text-sm leading-6 text-slate-300">
          이메일과 비밀번호를 입력해서 영화 탐험을 시작하세요.
        </p>
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

        <LoginField
          label="비밀번호"
          name="password"
          type="password"
          value={values.password}
          placeholder="비밀번호를 입력하세요"
          autoComplete="current-password"
          error={errors.password}
          showError={shouldShowPasswordError}
          onChange={onChange}
          onBlur={onBlur}
        />

        <button
          type="submit"
          disabled={!isValid}
          className="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginForm;