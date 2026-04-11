import { Controller, type Control } from 'react-hook-form';
import LoginField from './LoginField';
import type { LoginFormValues } from '../../types/auth';

type LoginFormProps = {
  control: Control<LoginFormValues>;
  isValid: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
};

const LoginForm = ({
  control,
  isValid,
  onSubmit,
  onBack,
}: LoginFormProps) => {
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
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <LoginField
              label="이메일"
              name={field.name}
              type="email"
              value={field.value ?? ''}
              placeholder="name@example.com"
              autoComplete="email"
              error={fieldState.error?.message}
              showError={Boolean(fieldState.error)}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <LoginField
              label="비밀번호"
              name={field.name}
              type="password"
              value={field.value ?? ''}
              placeholder="비밀번호를 입력하세요"
              autoComplete="current-password"
              error={fieldState.error?.message}
              showError={Boolean(fieldState.error)}
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
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginForm;