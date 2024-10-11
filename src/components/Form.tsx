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
    <div
      style={{
        padding: '0.5rem 1rem',
        border: '1px solid',
        maxWidth: '200px',
      }}
    >
      <h1 style={{ fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>
        This is a Form
      </h1>
      <h3 style={{ fontSize: '1rem', marginTop: 0, marginBottom: '1rem' }}>Please enter information.</h3>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <select name="option" style={{ width: '100%', padding: '5px' }}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          name="name"
          type="text"
          placeholder="Enter your name"
          style={{ padding: '5px' }}
        />
        <button
          type="submit"
          style={{ maxWidth: '80px', alignSelf: 'flex-end' }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
