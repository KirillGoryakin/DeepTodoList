import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { useRef } from 'react';
import { importProject } from 'store/slices/todoSlice';

const ImportExport = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.todo);
  const importRef = useRef<HTMLInputElement>(null);

  const exportState = () => {
    const filename = `TODO_${state.title}.json`;
    const jsonStr = JSON.stringify(state);

    const a = document.createElement('a');
    a.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr),
    );
    a.setAttribute('download', filename);
    a.style.display = 'none';

    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const importState = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = (e.target.files ?? [])[0];
    if (!file) return;
    file.text().then(text => dispatch(importProject(JSON.parse(text))));
    e.target.value = '';
  };
  
  return (
    <Box display='flex'>
      <Tooltip title='Export'>
        <IconButton onClick={exportState}>
          <DownloadIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title='Import'>
        <IconButton onClick={() => importRef.current?.click()}>
          <UploadIcon />
        </IconButton>
      </Tooltip>

      <input
        onChange={importState}
        ref={importRef}
        type='file' accept='.json'
        style={{ display: 'none' }}
      />
    </Box>
  );
};

export { ImportExport };