import { FC, useEffect, useState } from 'react';

type Option = {
  label: string;
  value: string;
};

export const Form: FC = () => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    fetch('/api/options')
      .then((response) => response.json())
      .then((data) => {
        setOptions(data);
      });
  });

  return (
    <form>
      <div style={{ marginBottom: '1rem' }}>
        <select>
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
