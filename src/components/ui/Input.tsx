interface InputProps<T> {
  setContent: (param: string) => T;
  value?: string;
  placeholder?: string;
}

export const Input = ({ setContent, placeholder, value }: InputProps<void>) => {
  return (
    <input
      value={value}
      onChange={(e) => setContent(e.target.value)}
      type="text"
      placeholder={placeholder}
      className="w-full md:h-10 h-8 px-4 bg-white rounded-2xl border-2 border-gray text-dgray"
    />
  );
};
