import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';

type Props = {
  value: string;
  children: (value: string) => React.ReactNode;
  onChange?: (value: string) => void;
  filter?: (value: string) => boolean;
  divProps?: React.ComponentProps<'div'>;
  inputProps?: React.ComponentProps<typeof TextField>;
};

const EditableText: React.FC<Props> = ({
  value: initialValue,
  children,
  onChange,
  filter,
  divProps,
  inputProps,
}) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = () => {
    setIsEditing(false);
    if (onChange) onChange(value);
  };

  const handleChange =  (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    if (!filter || filter(e.target.value)) setValue(e.target.value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  

  if (isEditing) return (
    <TextField
      value={value}
      onChange={handleChange}
      onBlur={handleSubmit}
      onKeyDown={e => e.key === 'Enter' && handleSubmit()}
      autoFocus
      onFocus={e => e.target.select()}
      variant='outlined'
      size='small'
      style={{ fontSize: 24 }}
      {...inputProps}
    />
  );

  return (
    <div
      className='editable-text'
      onClick={() => setIsEditing(true)}
      {...divProps}
    >
      {children(value)}
    </div>
  );
};

export { EditableText };