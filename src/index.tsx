import { App } from 'components/App';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from 'store';
import 'styles/global.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);