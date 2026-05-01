type LoginFieldProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder: string;
  autoComplete?: string;
  error?: string;
  showError?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const LoginField = ({
  label,
  name,
  type,
  value,
  placeholder,
  autoComplete,
  error,
  showError = false,
  onChange,
  onBlur,
}: LoginFieldProps) => {
  const hasError = Boolean(showError && error);

  return (
    <label className="block space-y-2 text-left">
      <span className="text-sm font-semibold text-slate-200">{label}</span>
      <input
        className={`w-full rounded-2xl border bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 ${
          hasError ? 'border-rose-400' : 'border-slate-700'
        }`}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={onChange}
        onBlur={onBlur}
      />
      {hasError && <p className="text-sm font-medium text-rose-300">{error}</p>}
    </label>
  );
};

export default LoginField;