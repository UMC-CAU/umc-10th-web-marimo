import SignupEmailForm from '../components/signup/SignupEmailForm';
import { useForm } from '../hooks/useForm';

type SignupFormValues = {
  email: string;
};

const initialValues: SignupFormValues = {
  email: '',
};

const validateSignupForm = (values: SignupFormValues) => {
  const errors: Partial<Record<keyof SignupFormValues, string>> = {};

  if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = '올바른 이메일 형식을 입력해주세요.';
  }

  return errors;
};

const SignupPage = () => {
  const { values, errors, touched, isValid, handleChange, handleBlur, markAllTouched } = useForm(
    initialValues,
    validateSignupForm
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    markAllTouched();

    if (!isValid) {
      return;
    }

 
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#1e293b,_#020617_50%)] px-4 py-10 text-slate-100">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center justify-center">
        <SignupEmailForm
          values={values}
          errors={errors}
          touched={touched}
          isValid={isValid}
          onChange={handleChange}
          onBlur={handleBlur}
          onSubmit={handleSubmit}
        />
      </section>
    </div>
  );
};

export default SignupPage;