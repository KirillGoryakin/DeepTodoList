import { Box, Container } from '@mui/material';
import { ProjectTitle } from './ProjectTitle';
import { TodoList } from './TodoList';
import { AddTodo } from './AddTodo';

const App = () => {
  return (
    <Container maxWidth='md'>
      <Box
        my={4} p={4}
        boxShadow={4}
        borderRadius={4}
      >
        <ProjectTitle />

        <Box
          display={}
        >
          <AddTodo />
        </Box>
      </Box>

      <TodoList />
    </Container>
  );
};

export { App };