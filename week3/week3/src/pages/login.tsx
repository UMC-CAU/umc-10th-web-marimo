import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LoginForm from '../components/login/LoginForm';
import { loginSchema } from '../schemas/auth';
import type { AuthSession, LoginFormValues } from '../types/auth';
import { useLocalStorage } from '../hooks/useLocalStorage';

const LoginPage = () => {
  const navigate = useNavigate();
  const [, setAuthSession] = useLocalStorage<AuthSession | null>('authSession', null);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleBack = () => {
    navigate(-1);
  };

  // ⭐️ 핵심: 실제 API 호출을 하는 onSubmit 하나만 컴포넌트 '내부'에 둡니다.
  const onSubmit = async (values: LoginFormValues) => {
    try {
      // 1. 실제 백엔드로 로그인 요청
      const response = await axios.post('http://localhost:8000/v1/auth/signin', {
        email: values.email,
        password: values.password,
      });

      console.log('로그인 성공:', response.data);

      // 2. 응답받은 실제 토큰 2개를 저장
      const { accessToken, refreshToken, nickname } = response.data;
      
      // ProtectedRoute가 확인할 수 있도록 localStorage에 명확히 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      setAuthSession({
        email: values.email,
        nickname: nickname || values.email.split('@')[0],
        token: accessToken,
      });

      // 3. 메인 페이지로 이동
      navigate('/');
      
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 백엔드 서버가 켜져 있는지, 이메일/비밀번호가 맞는지 확인해주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#1e293b,_#020617_50%)] px-4 py-10 text-slate-100">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center justify-center">
        <LoginForm
          control={control}
          isValid={isValid}
          onSubmit={handleSubmit(onSubmit)}
          onBack={handleBack}
        />
      </section>
    </div>
  );
};

export default LoginPage;