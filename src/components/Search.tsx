import {
  Box,
  TextField,
  Button,
  Radio,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

type SearchFormEvent = React.FormEvent<HTMLFormElement> & {
  target: {
    s: HTMLInputElement;
  };
};

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [s, setS] = useState('');
  const [filter, setFilter] = useState('');
  
  const search = (s: string, filter: string) => {
    if (s.trim().length > 0)
      searchParams.set('s', s.trim());
    else
      searchParams.delete('s');

    if (filter)
      searchParams.set('filter', filter);
    else
      searchParams.delete('filter');

    setSearchParams(searchParams);
  };

  const handleSubmit = (e: SearchFormEvent) => {
    e.preventDefault();
    search(s, filter);
  };

  const handleRadioChange = (value: string) => {
    setFilter(value);
    search(s, value);
  };

  useEffect(() => {
    const sParam = searchParams.get('s');
    const filterParam = searchParams.get('filter');
    
    setS(sParam ?? '');
    
    if (filterParam)
      setFilter(filterParam);
    else
      setFilter('');
  }, [searchParams, setFilter, setS]);
  
  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      display='flex'
      gap={4}
    >
      <Box
        component='fieldset'
        style={{ border: 'none' }}
        display='flex'
      >
        <Box
          component='label'
          display='flex'
          alignItems='center'
        >
          <Radio
            name='filterDone'
            onChange={() => handleRadioChange('')}
            checked={filter === ''}
          />
          <span>All</span>
        </Box>
        <Box
          component='label'
          display='flex'
          alignItems='center'
        >
          <Radio
            name='filterDone'
            onChange={() => handleRadioChange('done')}
            checked={filter === 'done'}
          />
          <span>Done</span>
        </Box>
        <Box
          component='label'
          display='flex'
          alignItems='center'
        >
          <Radio
            name='filterUndone'
            onChange={() => handleRadioChange('undone')}
            checked={filter === 'undone'}
          />
          <span>Undone</span>
        </Box>
      </Box>
      
      <div>
        <TextField
          name='s'
          value={s}
          onChange={e => setS(e.target.value)}
          placeholder='Search...'
          size='small'
        />
        <Button
          type='submit'
          size='large'
          variant='contained'
          style={{ padding: 8, minWidth: 24 }}
        >
          <SearchIcon />
        </Button>
      </div>
    </Box>
  );
};

export { Search };