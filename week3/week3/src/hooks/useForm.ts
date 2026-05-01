import { useCallback, useMemo, useState } from 'react';

export type FormErrors<T> = Partial<Record<keyof T, string>>;
export type FormTouched<T> = Partial<Record<keyof T, boolean>>;

type ValidateForm<T> = (values: T) => FormErrors<T>;

interface UseFormResult<T> {
  values: T;
  errors: FormErrors<T>;
  touched: FormTouched<T>;
  isValid: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  markAllTouched: () => void;
  resetForm: () => void;
}

export const useForm = <T extends Record<string, string>>(
  initialValues: T,
  validateForm: ValidateForm<T>
): UseFormResult<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [touched, setTouched] = useState<FormTouched<T>>({});

  const errors = useMemo(() => validateForm(values), [validateForm, values]);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  }, []);

  const markAllTouched = useCallback(() => {
    const allTouched = Object.keys(initialValues).reduce<FormTouched<T>>((accumulator, key) => {
      accumulator[key as keyof T] = true;
      return accumulator;
    }, {});

    setTouched(allTouched);
  }, [initialValues]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    markAllTouched,
    resetForm,
  };
};