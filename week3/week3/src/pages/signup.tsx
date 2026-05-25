import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SignupEmailForm from '../components/signup/SignupEmailForm';
import SignupPasswordForm from '../components/signup/SignupPasswordForm';
import SignupNicknameForm from '../components/signup/SignupNicknameForm';
import { signupSchema } from '../schemas/auth';
import type { AuthSession, SignupFormValues } from '../types/auth';
import { useLocalStorage } from '../hooks/useLocalStorage';
import axios from 'axios';

const SignupPage = () => {
  const navigate = useNavigate();
  const [, setAuthSession] = useLocalStorage<AuthSession | null>('authSession', null);
  const [step, setStep] = useState<'email' | 'password' | 'nickname'>('email');

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
    },
  });

  const email = watch('email');
  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');
  const nickname = watch('nickname');

  const handleEmailSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    trigger('email').then((ok) => {
      if (ok) {
        setStep('password');
      }
    });
  };

  const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    trigger(['password', 'passwordConfirm']).then((ok) => {
      if (ok) {
        setStep('nickname');
      }
    });
  };

  const handleNicknameSubmit = async(values: SignupFormValues) => {
    try {
      // 백엔드로 실제 회원가입 요청 보내기 (Swagger 주소인 /v1/auth/signup 사용)
      const response = await axios.post('http://localhost:8000/v1/auth/signup', {
        name: values.nickname,
        email: values.email,
        password: values.password// ⚠️ 백엔드 규칙에 따라 이름이 다를 수 있음
      });

      console.log("회원가입 성공! 백엔드 응답:", response.data);
      alert("회원가입이 완료되었습니다! 이제 로그인해 주세요.");
      
      // 회원가입 성공 시 로그인 페이지로 바로 이동
      navigate('/login');
      
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 이메일이 중복되었는지 확인해 주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#1e293b,_#020617_50%)] px-4 py-10 text-slate-100">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center justify-center">
        {step === 'email' ? (
          <SignupEmailForm
            control={control}
            errors={errors}
            currentEmail={email ?? ''}
            isValid={!errors.email && (email?.length ?? 0) > 0}
            onSubmit={handleEmailSubmit}
          />
        ) : step === 'password' ? (
          <SignupPasswordForm
            email={email ?? ''}
            control={control}
            errors={errors}
            currentPassword={password ?? ''}
            currentPasswordConfirm={passwordConfirm ?? ''}
            isValid={!errors.password && !errors.passwordConfirm && (password?.length ?? 0) >= 6 && (passwordConfirm?.length ?? 0) > 0}
            onSubmit={handlePasswordSubmit}
          />
        ) : (
          <SignupNicknameForm
            email={email ?? ''}
            control={control}
            errors={errors}
            currentNickname={nickname ?? ''}
            isValid={isValid && (nickname?.trim().length ?? 0) > 0}
            onSubmit={handleSubmit(handleNicknameSubmit)}
          />
        )}
      </section>
    </div>
  );
};

export default SignupPage;