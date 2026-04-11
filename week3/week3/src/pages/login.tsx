import { useNavigate } from 'react-router-dom';
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

  const onSubmit = (values: LoginFormValues) => {
    setAuthSession({
      email: values.email,
      nickname: values.email.split('@')[0],
      token: `mock-token-${Date.now()}`,
    });

    navigate('/');
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