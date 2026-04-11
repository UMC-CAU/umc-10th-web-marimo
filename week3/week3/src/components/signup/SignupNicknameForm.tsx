import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import LoginField from '../login/LoginField';
import type { SignupFormValues } from '../../types/auth';

type SignupNicknameFormProps = {
  email: string;
  control: Control<SignupFormValues>;
  errors: FieldErrors<SignupFormValues>;
  currentNickname: string;
  isValid: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const SignupNicknameForm = ({
  email,
  control,
  errors,
  currentNickname,
  isValid,
  onSubmit,
}: SignupNicknameFormProps) => {
  const shouldShowNicknameError = Boolean(errors.nickname || currentNickname.length > 0);

  return (
    <div className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="space-y-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300/80">Create Account</p>
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">회원가입</h1>
        <div className="mx-auto mt-2 inline-flex max-w-full items-center rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-1.5">
          <p className="truncate text-sm font-semibold text-cyan-100">{email}</p>
        </div>
        <p className="text-sm leading-6 text-slate-300">마지막으로 사용할 닉네임을 입력해 주세요.</p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
        <Controller
          name="nickname"
          control={control}
          render={({ field }) => (
            <LoginField
              label="닉네임"
              name={field.name}
              type="text"
              value={field.value ?? ''}
              placeholder="닉네임을 입력하세요"
              autoComplete="nickname"
              error={errors.nickname?.message}
              showError={shouldShowNicknameError}
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
          회원가입 완료
        </button>
      </form>
    </div>
  );
};

export default SignupNicknameForm;