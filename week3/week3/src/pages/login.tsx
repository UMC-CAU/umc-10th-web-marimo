import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';
import { useForm } from '../hooks/useForm';

type LoginFormValues = {
  email: string;
  password: string;
};

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

const validateLoginForm = (values: LoginFormValues) => {
  const errors: Partial<Record<keyof LoginFormValues, string>> = {};

  if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = '유효하지 않은 이메일 형식입니다.';
  }

  if (values.password.length < 6) {
    errors.password = '비밀번호는 최소 6자 이상이어야 합니다.';
  }

  return errors;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    markAllTouched,
  } = useForm(initialValues, validateLoginForm);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    markAllTouched();

    if (!isValid) {
      return;
    }

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#1e293b,_#020617_50%)] px-4 py-10 text-slate-100">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center justify-center">
        <LoginForm
          values={values}
          errors={errors}
          touched={touched}
          isValid={isValid}
          onChange={handleChange}
          onBlur={handleBlur}
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
      </section>
    </div>
  );
};

export default LoginPage;