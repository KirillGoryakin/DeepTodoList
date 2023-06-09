import { Box, Container } from '@mui/material';
import { ProjectTitle } from './ProjectTitle';
import { AddTodo } from './AddTodo';
import { ImportExport } from './ImportExport';
import { Search } from './Search';
import { MainList } from './MainList';

const Layout = () => {
  return (
    <Container maxWidth='md'>
      <Box
        position='relative'
        my={4} p={2}
        boxShadow={4}
        borderRadius={4}
      >
        <ProjectTitle />

        <Box position='absolute' top={16} right={16}>
          <ImportExport />
        </Box>

        <Box
          display='flex'
          justifyContent='center'
          gap={4}
        >
          <Search />
          <AddTodo />
        </Box>
      </Box>

      <MainList />
    </Container>
  );
};

export { Layout };