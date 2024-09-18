import { FC, useEffect, useState } from 'react';

type Option = {
  label: string;
  value: string;
};

type Props = {
  onSubmit: (data: unknown) => void;
};

export const Form: FC<Props> = ({ onSubmit }) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    fetch('/api/options')
      .then((response) => response.json())
      .then((data) => {
        setOptions(data.options);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(Object.fromEntries(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '1rem' }}>
        <select name="option">
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
