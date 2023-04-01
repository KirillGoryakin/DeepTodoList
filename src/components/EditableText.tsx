import { useState } from 'react';
import { Typography, Box, TextField } from '@mui/material';

type Props = {
  value: string;
  children: (value: string) => React.ReactNode;
  onChange?: (value: string) => void;
  divProps?: React.ComponentProps<'div'>;
  inputProps?: React.ComponentProps<typeof TextField>;
};

const EditableText: React.FC<Props> = ({
  value: initialValue,
  children,
  onChange,
  divProps,
  inputProps,
}) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = () => {
    setIsEditing(false);
    if (onChange) onChange(value);
  };

  if (isEditing) return (
    <TextField
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={() => handleChange()}
      onKeyDown={e => e.key === 'Enter' && handleChange()}
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