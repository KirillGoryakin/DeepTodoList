import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from 'react-router-dom';
import { Layout } from './Layout';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
  </Route>
));

const App = () => <RouterProvider router={router} />;

export { App };