import { useState } from 'react';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import type { SignupFormValues } from '../../types/auth';

type SignupPasswordFormProps = {
  email: string;
  control: Control<SignupFormValues>;
  errors: FieldErrors<SignupFormValues>;
  currentPassword: string;
  currentPasswordConfirm: string;
  isValid: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const EyeIcon = ({ opened }: { opened: boolean }) => {
  if (opened) {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
};

const SignupPasswordForm = ({
  email,
  control,
  errors,
  currentPassword,
  currentPasswordConfirm,
  isValid,
  onSubmit,
}: SignupPasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const showPasswordError = Boolean(errors.password || currentPassword.length > 0);
  const showPasswordConfirmError = Boolean(errors.passwordConfirm || currentPasswordConfirm.length > 0);

  return (
    <div className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="space-y-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300/80">Create Account</p>
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">회원가입</h1>
        <div className="mx-auto mt-2 inline-flex max-w-full items-center rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-1.5">
          <p className="truncate text-sm font-semibold text-cyan-100">{email}</p>
        </div>
      </div>

      <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
        <label className="block space-y-2 text-left">
          <span className="text-sm font-semibold text-slate-200">비밀번호</span>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <input
                  className={`w-full rounded-2xl border bg-slate-950/70 px-4 py-3 pr-12 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 ${
                    showPasswordError && errors.password ? 'border-rose-400' : 'border-slate-700'
                  }`}
                  type={showPassword ? 'text' : 'password'}
                  name={field.name}
                  value={field.value ?? ''}
                  placeholder="비밀번호를 입력하세요"
                  autoComplete="new-password"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-300 hover:bg-slate-800/60 hover:text-slate-100"
                  aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
                >
                  <EyeIcon opened={showPassword} />
                </button>
              </div>
            )}
          />
          {showPasswordError && errors.password?.message && (
            <p className="text-sm font-medium text-rose-300">{errors.password.message}</p>
          )}
        </label>

        <label className="block space-y-2 text-left">
          <span className="text-sm font-semibold text-slate-200">비밀번호 재확인</span>
          <Controller
            name="passwordConfirm"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <input
                  className={`w-full rounded-2xl border bg-slate-950/70 px-4 py-3 pr-12 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 ${
                    showPasswordConfirmError && errors.passwordConfirm ? 'border-rose-400' : 'border-slate-700'
                  }`}
                  type={showPasswordConfirm ? 'text' : 'password'}
                  name={field.name}
                  value={field.value ?? ''}
                  placeholder="비밀번호를 한 번 더 입력하세요"
                  autoComplete="new-password"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-300 hover:bg-slate-800/60 hover:text-slate-100"
                  aria-label={showPasswordConfirm ? '비밀번호 재확인 숨기기' : '비밀번호 재확인 표시'}
                >
                  <EyeIcon opened={showPasswordConfirm} />
                </button>
              </div>
            )}
          />
          {showPasswordConfirmError && errors.passwordConfirm?.message && (
            <p className="text-sm font-medium text-rose-300">{errors.passwordConfirm.message}</p>
          )}
        </label>

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

export default SignupPasswordForm;