import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Main from './Main';
import 'helpers/initFA';
import store from './store';
import { Provider } from 'react-redux';

store.subscribe(() => store.getState());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Main>
        <App />
      </Main>
    </Provider>
  </React.StrictMode>,
  document.getElementById('main')
);
