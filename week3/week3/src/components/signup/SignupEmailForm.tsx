import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import LoginField from '../login/LoginField';
import type { SignupFormValues } from '../../types/auth';

type SignupEmailFormProps = {
  control: Control<SignupFormValues>;
  errors: FieldErrors<SignupFormValues>;
  currentEmail: string;
  isValid: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const SignupEmailForm = ({
  control,
  errors,
  currentEmail,
  isValid,
  onSubmit,
}: SignupEmailFormProps) => {
  const shouldShowEmailError = Boolean(errors.email || currentEmail.length > 0);

  return (
    <div className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="space-y-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300/80">Create Account</p>
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">회원가입</h1>
        <p className="text-sm leading-6 text-slate-300">가입에 사용할 이메일 주소를 입력해 주세요.</p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <LoginField
              label="이메일"
              name={field.name}
              type="email"
              value={field.value ?? ''}
              placeholder="name@example.com"
              autoComplete="email"
              error={errors.email?.message}
              showError={shouldShowEmailError}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
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