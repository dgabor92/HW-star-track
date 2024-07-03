import { CustomInputProps } from "@/lib/interfaces";

const CustomInput = ({
  type,
  name,
  id,
  autoComplete,
  required,
  value,
  onChange,
  className,
  placeholder,
}: CustomInputProps) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      autoComplete={autoComplete}
      required={required}
      value={value}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
    />
  );
};

export default CustomInput;
